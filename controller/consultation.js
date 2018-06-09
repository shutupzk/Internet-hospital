import { Consultation, Doctor, Patient } from '../model'
import result from './result'
import { createTradeNo } from '../libs/utils'
import { createPayment } from './payment'

// 创建咨询订单
export const createConsultation = async (req, res) => {
  try {
    const { content, images = [], patientId, doctorId } = req.body
    if (!patientId || !content || !doctorId) return result.failed(res, '缺少参数')
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
      fee: doctor.imageAndTextPrice
    }
    const consultation = await Consultation.create(insetDoc)
    return result.success(res, consultation)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const createConsultationPayment = async (req, res) => {
  try {
    const {consultationId} = req.body
    if (!consultationId) return result.failed(res, '缺少参数')
    const consultation = await Consultation.findById(consultationId)
    if (!consultation) return result.failed(res, '未找到指定的订单')
    if (consultation.status !== '01') return result.failed(res, '此订单状态无法创建支付订单')
    let order = await createPayment(req, res)
    let paymentId = order._id
    Consultation.updateOne({_id: consultationId}, {paymentId})
    return result.success(res, order)
  } catch (e) {
    return result.failed(res, e.message)
  }
}
