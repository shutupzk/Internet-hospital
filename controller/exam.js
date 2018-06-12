import Model, { Exam, ExamItem, Consultation, ExaminationDictionary, Diagnosis } from '../model'
import result from './result'
import { createTradeNo } from '../libs/utils'

export const examCreate = async (req, res) => {
  try {
    let { consultationId, exams = [] } = req.body
    if (!consultationId) return result.failed(res, '缺少参数')
    if (exams.length === 0) return result.failed(res, '检查项为空')
    let consultation = await Consultation.findById(consultationId)
    if (!consultation) return result.failed(res, '未找到指定的订单')
    exams = JSON.parse(exams)
    const { _id, patientId, doctorId } = consultation
    const examNo = `H1${createTradeNo()}`

    let examdoc = {
      examNo,
      status: 1,
      doctorId,
      patientId,
      consultationId: _id,
      examinationDictionaryNames: []
    }

    let inputArray = []
    for (let exam of exams) {
      const {
        examinationDictionaryid,
        examinationOrganDictionaryids = [],
        leavingMessage = '',
        execDept = '',
        height = '',
        weight = '',
        liverNormal = null,
        iodineAllergy = null,
        hasHeavyMetal = null
      } = exam
      let examinationDictionary = await ExaminationDictionary.findById(examinationDictionaryid)
      if (!examinationDictionary) return res.fail(res, `存在未知检查项 ${examinationDictionaryid}`)
      if (examinationDictionary.radiation && !liverNormal && !iodineAllergy && !hasHeavyMetal) return res.fail(res, `存在特殊检查项未填写特殊内容 ${examinationDictionaryid}`)
      let examInput = {
        status: 1,
        examNo,
        doctorId,
        patientId,
        consultationId: _id,
        examinationDictionaryid,
        examinationDictionaryName: examinationDictionary.name,
        examinationOrganDictionaryids,
        leavingMessage,
        execDept: execDept || examinationDictionary.exeDept,
        height,
        weight,
        liverNormal,
        iodineAllergy,
        hasHeavyMetal
      }
      inputArray.push(examInput)
      examdoc.examinationDictionaryNames.push(examinationDictionary.name)
    }

    let exam = await Exam.create(examdoc)
    for (let it of inputArray) it.examId = exam._id
    await ExamItem.create(inputArray)
    return result.success(res, exam)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const examQuery = async (req, res) => {
  const { patientId, doctorId, consultationId, skip, limit } = req.body
  let ops = {}
  if (patientId) ops.patientId = patientId
  if (doctorId) ops.doctorId = doctorId
  if (consultationId) ops.consultationId = consultationId
  let list = await Model.findExamByOpsWithPage(Exam, { ops, skip, limit })
  list = JSON.parse(JSON.stringify(list))
  for (let item of list.items) {
    item.patient = item.patientId
    delete item.patientId
    let diagnosis = await Diagnosis.find({ consultationId: item.consultationId })
    item.diagnosis = (diagnosis && diagnosis.mainDiagnosis) || ''
  }
  return result.success(res, list)
}

export const examItemQuery = async (req, res) => {
  const { examId } = req.body
  if (!examId) return result.failed(res, '缺少参数')
  let list = await ExamItem.find({ examId }).populate('examinationOrganDictionaryids', 'name -_id').populate('examinationDictionaryid', 'name -_id radiation')
  list = JSON.parse(JSON.stringify(list))
  for (let item of list) {
    item.examinationOrganDictionarys = item.examinationOrganDictionaryids
    item.examinationDictionary = item.examinationDictionaryid
    delete item.examinationOrganDictionaryids
    delete item.examinationDictionaryid
    let diagnosis = await Diagnosis.find({ consultationId: item.consultationId })
    item.diagnosis = (diagnosis && diagnosis.mainDiagnosis) || ''
  }
  return result.success(res, list)
}
