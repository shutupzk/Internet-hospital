import { Consultation, Doctor, Patient } from '../model'
import result from './result'
import { createTradeNo } from '../libs/utils'

export const createConsultation = async (req, res) => {
  try {
    const { content, images = [], patientId, doctorId } = req.body
    if (!patientId || !content || !doctorId) return result.failed(res, '缺少参数')
    const doctor = await Doctor.findById(doctorId)
    if (!doctor) return result.failed(res, '未找到指定的医生')
    const patient = await Patient.findById(patientId)
    if (!patient) return result.failed(res, '未找到指定的患者')
    const consultationNo = `H0${createTradeNo()}`
    const insetDoc = {
      consultationNo,
      content,
      images,
      patientId,
      doctorId,
      status: '01',
      fee: doctor.imageAndTextPrice
    }
    const consultation = Consultation.create(insetDoc)
    return result.success(res, consultation)
  } catch (e) {
    return result.failed(res, e.message)
  }
}
