import { Diagnosis, Consultation } from '../model'
import result from './result'

export const diagnosisUpsert = async (req, res) => {
  let { consultationId, mainDiagnosis, secondDiagnosis = [] } = req.body
  if (!consultationId || !mainDiagnosis) return result.fail(res, '缺少参数')
  let consultation = await Consultation.findById(consultationId)
  if (!consultation) return result.fail(res, '未找到指定的订单')
  let { doctorId, patientId } = consultation
  let doc = {
    doctorId,
    patientId,
    consultationId,
    mainDiagnosis,
    secondDiagnosis
  }
  let data = Diagnosis.findOneAndUpdate({ consultationId }, doc, { upsert: true })
  return result.success(res, data)
}

export const diagnosisQuery = async (req, res) => {
  let { consultationId } = req.body
  if (!consultationId) return result.fail(res, '缺少参数')
  let data = Diagnosis.findOne({ consultationId })
  return result.success(res, data)
}