import Model, { Exam, ExamItem, Consultation, ExaminationDictionary, Diagnosis } from '../model'
import result from './result'
import { createTradeNo } from '../libs/utils'
import { sendMessage } from './chat_message'

export const examCreate = async (req, res) => {
  try {
    let { consultationId, exams = [] } = req.body
    if (!consultationId) return result.failed(res, '缺少参数')
    if (exams.length === 0) return result.failed(res, '检查项为空')
    let consultation = await Consultation.findById(consultationId)
    if (!consultation) return result.failed(res, '未找到指定的订单')
    exams = JSON.parse(exams)
    const { _id, patientId, doctorId, chatId } = consultation
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
    let messages = []
    for (let exam of exams) {
      const {
        examinationDictionaryId,
        examinationOrganDictionaryIds = [],
        leavingMessage = '',
        execDept = '',
        height = '',
        weight = '',
        liverNormal = null,
        iodineAllergy = null,
        hasHeavyMetal = null
      } = exam
      let examinationDictionary = await ExaminationDictionary.findById(examinationDictionaryId)
      if (!examinationDictionary) return result.failed(res, `存在未知检查项 ${examinationDictionaryId}`)
      if (examinationDictionary.radiation && !liverNormal && !iodineAllergy && !hasHeavyMetal) return result.failed(res, `存在特殊检查项未填写特殊内容 ${examinationDictionaryId}`)
      let examInput = {
        status: 1,
        examNo,
        doctorId,
        patientId,
        consultationId: _id,
        examinationDictionaryId,
        examinationOrganDictionaryIds,
        leavingMessage,
        execDept: execDept || examinationDictionary.exeDept,
        height,
        weight,
        liverNormal,
        iodineAllergy,
        hasHeavyMetal
      }
      inputArray.push(examInput)
      messages.push({
        chatId,
        consultationId: _id,
        type: '03',
        text: {
          examName: examinationDictionary.name
        },
        direction: 'doctor->user'
      })
      examdoc.examinationDictionaryNames.push(examinationDictionary.name)
    }

    let exam = await Exam.create(examdoc)
    for (let it of inputArray) it.examId = exam._id
    await ExamItem.create(inputArray)
    if (messages.length) {
      // for (let message of messages) {
      //   sendMessage({ ...message, examId: exam._id })
      // }
      sendMessage({ ...messages[0], examId: exam._id })
    }
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
    let diagnosis = await Diagnosis.findOne({ consultationId: item.consultationId })
    item.diagnosis = (diagnosis && diagnosis.mainDiagnosis) || ''
  }
  return result.success(res, list)
}

export const examItemQuery = async (req, res) => {
  const { examId } = req.body
  if (!examId) return result.failed(res, '缺少参数')
  let list = await ExamItem.find({ examId })
    .populate('examinationOrganDictionaryIds', 'name -_id')
    .populate('examinationDictionaryId', 'name -_id radiation')
  list = JSON.parse(JSON.stringify(list))
  for (let item of list) {
    item.examinationOrganDictionarys = item.examinationOrganDictionaryIds
    item.examinationDictionary = item.examinationDictionaryId
    delete item.examinationOrganDictionaryIds
    delete item.examinationDictionaryId
  }
  return result.success(res, list)
}
