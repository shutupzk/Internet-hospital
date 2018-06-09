import Model, { Consultation, Doctor, Patient, PatientWithDoctor, Chat, ChatMessage } from '../model'
import result from './result'
import { createTradeNo } from '../libs/utils'
import { createPayment } from './payment'
import { formatArrayId, formatObjId } from '../util'

// 创建咨询订单
export const createConsultation = async (req, res) => {
  try {
    const { content, images = [], patientId, doctorId, consultationReasonId } = req.body
    if (!patientId || !content || !doctorId || !consultationReasonId) return result.failed(res, '缺少参数')
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
      consultationReasonId,
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
    Consultation.updateOne({ _id: consultationId }, { paymentId })
    return result.success(res, order)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const consultationList = async (req, res) => {
  const { doctorId, userId, patientId, status, skip, limit } = req.body

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
    if (status) ops.status = status
    if (patientId) ops.patientId = patientId
    if (doctorId) ops.doctorId = doctorId

    const consultationList = await Model.findConsultationByOpsWithPage(Consultation, { ops, limit, skip })
    consultationList.items = formatArrayId(consultationList.items, ['patient', 'doctor'])
    return result.success(res, consultationList)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

export const updateConsultation = async (req, res) => {
  try {
    const { consultationId, status } = req.body
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
    } else if (status === '07') {
      if (consultation.status !== '04') return result.failed(res, '当前状态不能取消')
      if (chat) {
        await Chat.updateOne({ _id: chat._id }, { status: false })
      }
    } else if (status === '10') {
      // 退款（管理后台）
      if (consultation.status !== '03' && consultation.status !== '04' && consultation.status !== '05' && consultation.status !== '07') return result.failed(res, '当前状态不能取消')
      if (chat) {
        await Chat.updateOne({ _id: chat._id }, { status: false })
      }
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
    if (!consultation) return result.failed(res, '-1', '订单不存在')
    const { chatId } = consultation
    let chatMessages = await ChatMessage.find({ chatId })
    chatMessages = formatArrayId(chatMessages)
    return result.success(res, chatMessages)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

// 发送咨询的初始消息
export const consultationSendStartMessage = consultationId => {

}
