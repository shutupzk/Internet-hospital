import { ChatMessage, Chat, Consultation } from '../model'
import { formatChat } from './chat'
import result from './result'
import { TencentIM, SystemParam } from '../config'
import moment from 'moment'
import { formatObjId, formatArrayId } from '../util'

const { chatFinishCountByDoctor, chatFinishCountByUser } = SystemParam

export const chatMessageCreate = async (req, res) => {
  try {
    let chatMessage = await sendMessage(req.body)
    return result.success(res, formatObjId(chatMessage))
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const consultationChatMessageCreate = async (req, res) => {
  const { consultationId, direction, type, chatId } = req.body
  if (!consultationId || !direction || !type || !chatId) return result.failed(res, '参数错误')
  try {
    let { status } = await Consultation.findById(consultationId)
    if (status !== '03' && status !== '04') {
      return result.failed(res, '订单状态不正确')
    }
    let endMsgFlag = false // 是否是最后一条消息
    let firstDocMsg = false // 是否是第一次回复消息
    if (type === '01') {
      if (direction === 'user->doctor' && type === '01') {
        let userCount = await ChatMessage.count({ consultationId, direction: 'user->doctor', type: '01' })
        if (userCount >= chatFinishCountByUser) {
          return result.failed(res, '已超过最大发送条数')
        }
      } else if (direction === 'doctor->user') {
        let doctorCount = await ChatMessage.count({ consultationId, direction: 'doctor->user', type: '01' })
        console.log('doctorCount ======= ', doctorCount)
        if (doctorCount >= chatFinishCountByDoctor) {
          await Consultation.updateOne({ _id: consultationId }, { status: '07' })
          await Chat.updateOne({ _id: chatId }, { status: false })
          return result.failed(res, '该会话已结束')
        }
        if (doctorCount + 1 === chatFinishCountByDoctor) endMsgFlag = true
        if (doctorCount === 0) firstDocMsg = true
      }
    }

    if (firstDocMsg) {
      const firstMsg = {
        type: '06',
        text: {
          doctorMsg: {
            text: `因不能面诊患者，无法全面了解病情，以下建议仅供参考，具体诊疗请一定到院在医生指导下进行！`
          },
          userMsg: {
            text: `因不能面诊患者，无法全面了解病情，以下建议仅供参考，具体诊疗请一定到院在医生指导下进行！`
          }
        },
        direction: 'user->doctor',
        chatId,
        consultationId
      }
      sendMessage(firstMsg)
    }

    let chatMessage = await sendMessage(req.body)
    result.success(res, formatObjId(chatMessage))

    // 结束订单
    if (endMsgFlag) {
      const endMsg = {
        type: '06',
        text: {
          doctorMsg: {
            type: `咨询结束`,
            text: `已于${moment().format('MM月DD日 HH:mm')}回复完${chatFinishCountByUser}次问题。`
          },
          userMsg: {
            type: `咨询结束`,
            text: `医生已回复您三次问题。`
          }
        },
        direction: 'user->doctor',
        chatId,
        consultationId
      }
      sendMessage(endMsg)
      Consultation.updateOne({ _id: consultationId }, { status: '07' })
      Chat.updateOne({ _id: chatId }, { status: false })
    }
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const retractChatMessage = async (req, res) => {
  const { id } = req.body
  if (!id) return result.failed(res, '参数错误')
  try {
    let chatMessage = await ChatMessage.findById(id)
    if (!chatMessage) return result.failed(res, '消息不存在')
    const { consultationId, created_at } = chatMessage
    let consultation = await Consultation.findById(consultationId)
    if (!consultation) return result.failed(res, '订单不存在')
    const { status } = consultation
    if (status !== '03' && status !== '04') {
      return result.failed(res, '订单状态不正确')
    }
    let time = 5
    let validTime =
      moment()
        .add(time * -1, 'm')
        .format('x') * 1
    let createTime = moment(created_at).format('x') * 1
    if (createTime < validTime) return result.failed(res, `超过${time}分钟无法撤回`)
    await ChatMessage.updateOne({ _id: id }, { isRetract: true, updated_at: new Date() })
    let data = await ChatMessage.findById(id)
    return result.success(res, formatObjId(data))
  } catch (e) {
    console.log(e)
    return result.failed(res, e.message)
  }
}

export const chatMessageList = async (req, res) => {
  let { chatId, skip = 0, limit = 10 } = req.body
  skip = skip * 1
  limit = limit * 1
  try {
    let chatMessages = await ChatMessage.find({ chatId })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
    return result.success(res, formatArrayId(chatMessages))
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const sendMessages = async (messages = []) => {
  try {
    for (let message of messages) {
      await sendMessage(message)
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const sendMessage = async ({ chatId, consultationId, type, text, image, audio, direction, prescriptionId, examId, laboraId }) => {
  if (!chatId || !type || !direction) throw new Error('参数错误')
  if (!text && !image && !audio) throw new Error('发送内容不能为空')
  let chatOrigin = await Chat.findById(chatId).populate([
    {
      path: 'patientWithDoctorId',
      select: '_id',
      populate: [{ path: 'userId', select: 'openId identifier' }, { path: 'doctorId', select: 'doctorSn doctorName identifier' }, { path: 'patientId', select: 'name' }]
    },
    { path: 'systemWithUserId', select: '_id', populate: [{ path: 'systemId', select: '_id code name identifier' }, { path: 'userId', select: 'openId identifier' }] },
    { path: 'systemWithDoctorId', select: '_id', populate: [{ path: 'systemId', select: '_id code name identifier' }, { path: 'doctorId', select: 'doctorSn identifier' }] }
  ])
  let chat = formatChat(chatOrigin, true)
  let chatMessage = await ChatMessage.create({ chatId, consultationId, type, text, image, audio, direction, prescriptionId, examId, laboraId })
  sendImMsg(chat, chatMessage)
  return chatMessage
}

async function sendImMsg(chat, chatMessage) {
  try {
    const { id, userAccount, systemAccount, doctorAccount, patient, doctor, system } = chat
    const { direction, type, image, audio, text } = chatMessage
    let From_Account, To_Account, Title, Content, lastMsgContent
    if (direction === 'user->doctor') {
      From_Account = userAccount
      To_Account = doctorAccount
      Title = patient.name
    } else if (direction === 'doctor->user') {
      From_Account = doctorAccount
      To_Account = userAccount
      Title = doctor.doctorName
    } else if (direction === 'system->user') {
      From_Account = systemAccount
      To_Account = userAccount
      Title = system.name
    } else if (direction === 'system->doctor') {
      From_Account = systemAccount
      To_Account = doctorAccount
      Title = system.name
    }

    let Text = JSON.stringify(chatMessage)
    if (type === '01') {
      if (text) Content = text
      if (image) Content = '[图片]'
      if (audio) Content = '[语音]'
      lastMsgContent = Content
      await TencentIM.sendmsg({ From_Account, To_Account, Text, Title, Desc: Content, Ext: Content })
    } else if (type === '06') {
      lastMsgContent = type
      if (text && text.userMsg) {
        Content = text.userMsg.text
        await TencentIM.sendmsg({ From_Account, To_Account, Text, Title, Desc: Content, Ext: Content })
      }
      if (text && text.doctorMsg) {
        Content = text.doctorMsg.text
        await TencentIM.sendmsg({ From_Account, To_Account, Text, Title, Desc: Content, Ext: Content })
      }
    }
    await Chat.updateOne({ _id: id }, { lastMsgContent, lastMsgTime: new Date() })
  } catch (e) {
    console.log(e)
  }
}
