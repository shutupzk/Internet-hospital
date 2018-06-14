import { Diagnosis, Consultation } from '../model'
import result from './result'

export const diagnosisUpsert = async (req, res) => {
  let { consultationId, mainDiagnosis, secondDiagnosis, chiefComplaint, historyOfPastIllness } = req.body
  if (!consultationId || !mainDiagnosis || !chiefComplaint) return result.failed(res, '缺少参数')
  secondDiagnosis = secondDiagnosis ? JSON.parse(secondDiagnosis) : []
  let consultation = await Consultation.findById(consultationId)
  if (!consultation) return result.failed(res, '未找到指定的订单')
  let { doctorId, patientId } = consultation
  let doc = {
    doctorId,
    patientId,
    consultationId,
    mainDiagnosis,
    secondDiagnosis,
    chiefComplaint,
    historyOfPastIllness
  }
  await Diagnosis.findOneAndUpdate({ consultationId }, doc, { upsert: true })
  const data = await Diagnosis.findOne({ consultationId })
  return result.success(res, data)
}

export const diagnosisQuery = async (req, res) => {
  let { consultationId } = req.body
  if (!consultationId) return result.failed(res, '缺少参数')
  try {
    let data = await Diagnosis.findOne({ consultationId }).populate('patientId', 'patientIdNo birthday name sex -_id')
    if (!data) return result.success(res)
    data = JSON.parse(JSON.stringify(data))
    data.patient = data.patientId
    delete data.patientId
    return result.success(res, data)
  } catch (e) {
    console.log(e)
    return result.failed(res, e.message)
  }
}
