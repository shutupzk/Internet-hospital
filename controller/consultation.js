import Model, { Consultation, Doctor, Patient, PatientWithDoctor, Chat, ChatMessage, Diagnosis, Payment } from '../model'
import result from './result'
import { createTradeNo } from '../libs/utils'
import { createPayment, refundPayment } from './payment'
import { formatArrayId, formatObjId } from '../util'
import moment from 'moment'
import { sendMessages } from './chat_message'

// 创建咨询订单
export const createConsultation = async (req, res) => {
  try {
    let { content, images, patientId, doctorId, consultationReason } = req.body
    if (!patientId || !content || !doctorId || !consultationReason) return result.failed(res, '缺少参数')
    images = images ? JSON.parse(images) : []
    const doctor = await Doctor.findById(doctorId)
    if (!doctor) return result.failed(res, '未找到指定的医生')
    const patient = await Patient.findById(patientId)
    if (!patient) return result.failed(res, '未找到指定的患者')
    const consultationNo = `H0${createTradeNo()}`
    const exist = await Consultation.findOne({ patientId, doctorId, status: { $in: ['01', '03', '04'] } })
    if (exist) return result.failed(res, '有未完成订单，无法继续下单')
    const insetDoc = {
      consultationNo,
      content,
      images,
      patientId,
      doctorId,
      status: '01',
      consultationReason,
      fee: doctor.imageAndTextPrice
    }
    let consultation = await Consultation.create(insetDoc)
    consultation = formatObjId(consultation)

    return result.success(res, consultation)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

// 创建咨询支付订单
export const createConsultationPayment = async (req, res) => {
  try {
    const { consultationId } = req.body
    if (!consultationId) return result.failed(res, '缺少参数')
    const consultation = await Consultation.findById(consultationId)
    if (!consultation) return result.failed(res, '未找到指定的订单')
    if (consultation.status !== '01') return result.failed(res, '此订单状态无法创建支付订单')
    let order = await createPayment(req, res)
    let paymentId = order._id
    await Consultation.updateOne({ _id: consultationId }, { paymentId })
    return result.success(res, order)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const consultationList = async (req, res) => {
  const { doctorId, userId, patientId, status, skip, limit } = req.body
  console.log('doctorId', doctorId)
  console.log('userId', userId)
  console.log('patientId', patientId)
  console.log('status', status)

  try {
    let ops = {
      deleted_at: { $exists: false }
    }
    if (userId) {
      let patientIds = []
      const patients = await Patient.find({ userId })
      for (let patient of patients) {
        patientIds.push(patient._id)
      }
      ops.patientId = { $in: patientIds }
    }
    if (status === false) {
      ops.status = { $in: ['03', '04'] }
    } else if (status === true) {
      ops.status = { $in: ['05', '06', '07', '08', '09'] }
    }
    if (patientId) ops.patientId = patientId
    if (doctorId) ops.doctorId = doctorId
    console.log('ops', ops)
    const consultationList = await Model.findConsultationByOpsWithPage(Consultation, { ops, limit, skip })
    consultationList.items = formatArrayId(consultationList.items, ['patient', 'doctor', 'chat'])
    for (let consultation of consultationList.items) {
      consultation.patient = formatObjId(consultation.patient)
      consultation.doctor = formatObjId(consultation.doctor)
      if (consultation.chat) {
        consultation.chat = formatObjId(consultation.chat)
      }

      const diagnosis = await Diagnosis.findOne({ consultationId: consultation.id })
      if (diagnosis) {
        consultation.mainDiagnosis = diagnosis.mainDiagnosis
      } else {
        consultation.mainDiagnosis = ''
      }
    }
    return result.success(res, consultationList)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const updateConsultation = async (req, res) => {
  try {
    let { consultationId, status } = req.body
    if (!consultationId || !status) return result.failed(res, '缺少参数')
    const consultation = await Consultation.findOne({ _id: consultationId })
    if (!consultation) return result.failed(res, '未找到指定的订单')

    const { doctorId, patientId } = consultation
    const chat = await Chat.findOne({ doctorId, patientId })

    if (status === '02' || status === '06') {
      if (consultation.status !== '01' && consultation.status !== '03') return result.failed(res, '当前状态不能取消')
      const patientWithDoctor = await PatientWithDoctor.findOne({ patientId, doctorId })
      if (!patientWithDoctor) return result.failed(res, '订单信息错误')
      if (chat) {
        await Chat.updateOne({ _id: chat._id }, { status: false })
      }
      if (consultation.status === '03' && status === '06') {
        // 患者取消是发送消息
        let consultationId = consultation._id
        let chatId = chat._id
        let endTime = moment().format('MM月DD日 HH:mm')
        let smMessage = [
          {
            type: '06',
            text: {
              doctorMsg: {
                type: '咨询结束',
                text: `患者已于${endTime}分取消订单。`
              },
              userMsg: {
                type: '咨询结束',
                text: `您已取消订单。`
              }
            },
            direction: 'user->doctor',
            chatId,
            consultationId
          }
        ]
        sendMessages(smMessage)
        status = await refundConsultation(consultationId, status)
      }
    } else if (status === '07') {
      if (consultation.status !== '04') return result.failed(res, '当前状态不能完成订单')
      if (chat) {
        await Chat.updateOne({ _id: chat._id }, { status: false })
      }
      let consultationId = consultation._id
      let chatId = chat._id
      let endTime = moment().format('MM月DD日 HH:mm')
      let smMessage = [
        {
          type: '06',
          text: {
            doctorMsg: {
              type: '咨询结束',
              text: `患者已于${endTime}结束了本次咨询。`
            },
            userMsg: {
              type: '咨询结束',
              text: `您已于${endTime}结束了本次咨询`
            }
          },
          direction: 'user->doctor',
          chatId,
          consultationId
        }
      ]
      sendMessages(smMessage)
    } else if (status === '10') {
      // 退款（管理后台）
      if (consultation.status !== '03' && consultation.status !== '04' && consultation.status !== '05' && consultation.status !== '07') return result.failed(res, '当前状态不能取消')
      if (chat) {
        await Chat.updateOne({ _id: chat._id }, { status: false })
      }
    } else {
      return result.failed(res, '传入的状态无效')
    }
    Consultation.updateOne({ _id: consultationId }, { status })
    let resData = await Consultation.findOne({ _id: consultationId })
    resData = formatObjId(resData)

    return result.success(res, resData)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const consultationChat = async (req, res) => {
  const { consultationId } = req.body
  if (!consultationId) return result.failed(res, '缺少参数')

  try {
    let ops = {
      _id: consultationId,
      deleted_at: { $exists: false }
    }

    let consultation = await Consultation.findOne(ops)
    if (!consultation) return result.failed(res, '订单不存在')
    const { chatId } = consultation
    let chatMessages = await ChatMessage.find({ chatId })
    chatMessages = formatArrayId(chatMessages)
    return result.success(res, chatMessages)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

// 发送咨询的初始消息
export const consultationSendStartMessage = async consultationId => {
  const consultation = await Consultation.findById(consultationId)
  let { images, content, chatId } = consultation
  let consultationTime = moment(consultation.createdAt).format('MM月DD日 HH:mm')

  let smMessage = [
    {
      type: '06',
      text: {
        doctorMsg: {
          type: '咨询开始',
          text: `患者于${consultationTime}购买了您的咨询服务，请在48小时内回复。`
        },
        userMsg: {
          type: '咨询开始',
          text: `您提交的病历信息已经发送给医生，请等待回复。`
        }
      },
      direction: 'user->doctor',
      chatId,
      consultationId
    },
    {
      type: '06',
      text: {
        userMsg: {
          text: `温馨提示\n1. 订单在48小时内自动结束。如医生未在48小时之内回复，您所支付的费用将原路退还。\n2. 在48小时内，医生最多回复三次。`
        }
      },
      direction: 'doctor->user',
      chatId,
      consultationId
    }
  ]
  if (content) {
    smMessage.push({
      type: '01',
      text: content,
      direction: 'user->doctor',
      chatId,
      consultationId
    })
  }
  if (images) {
    for (let image of images) {
      if (content) {
        smMessage.push({
          type: '01',
          image,
          direction: 'user->doctor',
          chatId,
          consultationId
        })
      }
    }
  }
  console.log('smMessage ======', smMessage)
  sendMessages(smMessage)
}

export const consultationDetail = async (req, res) => {
  const { consultationId } = req.body
  if (!consultationId) return result.failed(res, '缺少参数')

  try {
    let consultationDetail = await Consultation.findById(consultationId)
      .populate({ path: 'doctorId', select: '-_id -password -created_at -updated_at', populate: { path: 'departmentId', select: 'deptName -_id' } })
      .populate({ path: 'patientId', select: '-_id -created_at -updated_at' })
      .populate({ path: 'paymentId', select: '-_id -orderInfo -payNotifyData -consultationId' })
    consultationDetail = formatObjId(consultationDetail, ['doctor', 'patient', 'payment'])
    consultationDetail.doctor = formatObjId(consultationDetail.doctor, ['departmentId'])
    return result.success(res, consultationDetail)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const refundConsultation = async (consultationId, status) => {
  try {
    const refundMap = { '05': '08', '06': '09' }
    if (Object.keys(refundMap).indexOf(status) === -1) throw new Error('未识别的退费状态')
    const consultation = await Consultation.findById(consultationId)
    if (!consultation) throw new Error('为找到指定的')
    let payment = await Payment.findById(consultation.paymentId)
    if (!payment) throw new Error('为找到指定的支付订单')
    const { outTradeNo } = payment
    await refundPayment({ outTradeNo })
    return refundMap[status]
  } catch (e) {
    return status
  }
}
