import { ChatMessage, Chat } from '../model'
import { formatChat } from './chat'
import result from './result'

export const chatMessageCreate = async (req, res) => {
  const { TencentIM } = req.context
  try {
    let chatMessage = await sendMessage(TencentIM, req.body)
    return result.success(res, chatMessage)
  } catch (e) {
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
    return result.success(res, chatMessages)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const sendMessage = async (TencentIM, { chatId, consultationId, type, text, image, audio, direction, prescriptionId, examId, laboraId }) => {
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
  sendImMsg(TencentIM, chat, chatMessage)
  return chatMessage
}

async function sendImMsg(TencentIM, chat, chatMessage) {
  try {
    const { id, userAccount, systemAccount, doctorAccount, patient, doctor, system } = chat
    console.log('chatId ======', chat)
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
      TencentIM.sendmsg({ From_Account, To_Account, Text, Title, Desc: Content, Ext: Content })
    } else if (type === '06') {
      lastMsgContent = type
      if (text && text.userMsg) {
        Content = text.userMsg.text
        TencentIM.sendmsg({ From_Account, To_Account, Text, Title, Desc: Content, Ext: Content })
      }
      if (text && text.doctorMsg) {
        Content = text.doctorMsg.text
        TencentIM.sendmsg({ From_Account, To_Account, Text, Title, Desc: Content, Ext: Content })
      }
    }
    await Chat.updateOne({ _id: id }, { lastMsgContent, lastMsgTime: new Date() })
  } catch (e) {
    console.log(e)
  }
}
