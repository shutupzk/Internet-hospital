import Model, { Labor, LaborItem, LaboratoryDictionary, Diagnosis, Consultation, LaboratorySampleDictionary } from '../model'
import result from './result'
import { createTradeNo } from '../libs/utils'
import { sendMessage } from './chat_message'

export const laborCreate = async (req, res) => {
  try {
    let { consultationId, labors = [] } = req.body
    if (!consultationId) return result.failed(res, '缺少参数')
    if (labors.length === 0) return result.failed(res, '检查项为空')
    let consultation = await Consultation.findById(consultationId)
    if (!consultation) return result.failed(res, '未找到指定的订单')
    labors = JSON.parse(labors)
    const { _id, patientId, doctorId, chatId } = consultation
    const laborNo = `H2${createTradeNo()}`

    let doc = {
      laborNo,
      status: 1,
      doctorId,
      patientId,
      consultationId: _id,
      laboratoryDictionaryNames: []
    }

    let inputArray = []
    let messages = []
    for (let labor of labors) {
      const { laboratoryDictionaryId, laboratorySampleDictionaryId, leavingMessage = '', execDept = '' } = labor
      let laboratoryDictionary = await LaboratoryDictionary.findById(laboratoryDictionaryId)
      if (!laboratoryDictionary) return result.failed(res, `存在未知检验项 ${laboratoryDictionaryId}`)
      let sampleName = ''
      if (laboratorySampleDictionaryId) {
        let laboratorySampleDictionary = await LaboratorySampleDictionary.findById(laboratorySampleDictionaryId)
        if (laboratorySampleDictionary) sampleName = laboratorySampleDictionary.name
      }
      let examInput = {
        status: 1,
        laborNo,
        doctorId,
        patientId,
        consultationId: _id,
        laboratoryDictionaryId,
        laboratorySampleDictionaryId,
        leavingMessage,
        execDept: execDept || laboratoryDictionary.exeDept
      }
      inputArray.push(examInput)
      messages.push({
        chatId,
        consultationId: _id,
        type: '04',
        text: {
          laborName: laboratoryDictionary.name,
          sampleName
        },
        direction: 'doctor->user'
      })
      doc.laboratoryDictionaryNames.push(laboratoryDictionary.name)
    }

    let labor = await Labor.create(doc)
    for (let it of inputArray) it.laborId = labor._id
    await LaborItem.create(inputArray)
    if (messages.length) {
      // for (let message of messages) {
      //   sendMessage({ ...message, laboraId: labor._id })
      // }
      console.log('labaor message ===', messages[0])
      sendMessage({ ...messages[0], laboraId: labor._id })
    }
    return result.success(res, labor)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const laborQuery = async (req, res) => {
  const { patientId, doctorId, consultationId, skip, limit } = req.body
  let ops = {}
  if (patientId) ops.patientId = patientId
  if (doctorId) ops.doctorId = doctorId
  if (consultationId) ops.consultationId = consultationId
  let list = await Model.findExamByOpsWithPage(Labor, { ops, skip, limit })
  list = JSON.parse(JSON.stringify(list))
  for (let item of list.items) {
    item.patient = item.patientId
    delete item.patientId
    let diagnosis = await Diagnosis.findOne({ consultationId: item.consultationId })
    item.diagnosis = (diagnosis && diagnosis.mainDiagnosis) || ''
  }
  return result.success(res, list)
}

export const laborItemQuery = async (req, res) => {
  const { laborId } = req.body
  if (!laborId) return result.failed(res, '缺少参数')
  let list = await LaborItem.find({ laborId })
    .populate('laboratorySampleDictionaryId', 'name -_id')
    .populate('laboratoryDictionaryId', 'name -_id')
  list = JSON.parse(JSON.stringify(list))
  for (let item of list) {
    item.laboratorySampleDictionary = item.laboratorySampleDictionaryId
    item.laboratoryDictionary = item.laboratoryDictionaryId
    delete item.laboratorySampleDictionaryId
    delete item.laboratoryDictionaryId
  }
  return result.success(res, list)
}
