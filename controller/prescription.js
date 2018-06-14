import Model, { EastPrescription, EastPrescriptionItem, WestPrescription, WestPrescriptionItem, Consultation, Drug, Diagnosis } from '../model'
import result from './result'
import { createTradeNo } from '../util'

export const prescriptionCreate = async (req, res) => {
  let { consultationId, eastPrescription, westPrescription } = req.body
  if (!consultationId) return result.failed(res, 'consultationId 不能为空')
  if (!eastPrescription && !westPrescription) {
    return result.failed(res, '中药处方、西药处方不能同时为空')
  }
  let westPrescriptionId
  let eastPrescriptionId
  try {
    const wPrescriptionNo = `WP${createTradeNo()}`
    const CPrescriptionNo = `CP${createTradeNo()}`
    const consultation = await Consultation.findById(consultationId)
    if (!consultation) return result.failed(res, '订单不存在')
    const { doctorId, patientId } = consultation
    westPrescriptionId = await westPrescriptionCreate({ westPrescription, doctorId, patientId, consultationId, wPrescriptionNo })
    eastPrescriptionId = await eastPrescriptionCreate({ eastPrescription, doctorId, patientId, consultationId, CPrescriptionNo })
    return result.success(res)
  } catch (e) {
    if (westPrescriptionId) WestPrescription.deleteOne({ _id: westPrescriptionId })
    if (eastPrescriptionId) EastPrescription.deleteOne({ _id: eastPrescriptionId })
    return result.failed(res, '保存失败：' + e.message)
  }
}

export const westPrescriptionList = async(req, res) => {
  const { patientId, doctorId, consultationId, skip, limit } = req.body
  let ops = {}
  if (patientId) ops.patientId = patientId
  if (doctorId) ops.doctorId = doctorId
  if (consultationId) ops.consultationId = consultationId
  let list = await Model.findPreByOpsWithPage(WestPrescription, { ops, skip, limit })
  list = JSON.parse(JSON.stringify(list))
  for (let item of list.items) {
    item.patient = { id: item.patientId._id, name: item.patientId.name }
    item.id = item._id
    delete item.patientId
    delete item._id
    let diagnosis = await Diagnosis.find({ consultationId: item.consultationId })
    item.diagnosis = (diagnosis && diagnosis.mainDiagnosis) || ''
  }
  return result.success(res, list)
}

export const eastPrescriptionList = async(req, res) => {
  const { patientId, doctorId, consultationId, skip, limit } = req.body
  let ops = {}
  if (patientId) ops.patientId = patientId
  if (doctorId) ops.doctorId = doctorId
  if (consultationId) ops.consultationId = consultationId
  let list = await Model.findPreByOpsWithPage(EastPrescription, { ops, skip, limit })
  list = JSON.parse(JSON.stringify(list))
  for (let item of list.items) {
    item.patient = { id: item.patientId._id, name: item.patientId.name }
    item.id = item._id
    delete item.patientId
    delete item._id
    let diagnosis = await Diagnosis.find({ consultationId: item.consultationId })
    item.diagnosis = (diagnosis && diagnosis.mainDiagnosis) || ''
  }
  return result.success(res, list)
}

export const eastPrescriptionItemList = async (req, res) => {
  const { eastPrescriptionId } = req.body
  if (!eastPrescriptionId) return result.failed(res, '缺少参数')
  let list = await EastPrescriptionItem.find({ eastPrescriptionId }).populate('drugId', '_id, name')
  list = JSON.parse(JSON.stringify(list))
  for (let item of list) {
    let drug = { id: item.drugId._id, name: item.drugId.name }
    item.drug = drug
    delete item.drugId
  }
  return result.success(res, list)
}

export const westPrescriptionItemList = async (req, res) => {
  const { westPrescriptionId } = req.body
  if (!westPrescriptionId) return result.failed(res, '缺少参数')
  let list = await WestPrescriptionItem.find({ westPrescriptionId }).populate('drugId', '_id, name')
  list = JSON.parse(JSON.stringify(list))
  for (let item of list) {
    let drug = { id: item.drugId._id, name: item.drugId.name }
    item.drug = drug
    delete item.drugId
  }
  return result.success(res, list)
}

export const westPrescriptionCreate = async ({ westPrescription, doctorId, patientId, consultationId, wPrescriptionNo }) => {
  const { overDaysReason, items = [] } = westPrescription
  if (items.length === 0) throw new Error('西药处方条目 不能为空')
  let array = []
  let drugNames = []
  for (let { drugId, onceDose, onceDoseUnitName, routeAdministrationName, frequencyName, illustration, amount } of items) {
    if (!drugId) throw new Error('西药处方条目 药品id 不能为空')
    if (!onceDose) throw new Error('西药处方条目 单词用量 不能为空')
    if (!onceDoseUnitName) throw new Error('西药处方条目 单词用量单位 不能为空')
    if (!routeAdministrationName) throw new Error('西药处方条目 用法（用药途径） 不能为空')
    if (!frequencyName) throw new Error('西药处方条目 用药频率 不能为空')
    if (!amount) throw new Error('西药处方条目 用量 不能为空')
    const drug = await Drug.findById(drugId)
    if (!drug) throw new Error('西药处方条目 药品未不存在 drugId: ' + drugId)
    if (drug.type === 1) throw new Error('西药处方条目 药品类型为中药 drugId: ' + drugId)
    array.push({ drugId, onceDose, onceDoseUnitName, routeAdministrationName, frequencyName, illustration })
    drugNames.push(drug.name)
  }
  let westPrescriptionId
  try {
    let wpre = await WestPrescription.create({ prescriptionNo: wPrescriptionNo, doctorId, patientId, consultationId, overDaysReason, drugNames })
    westPrescriptionId = wpre._id
    for (let item of array) {
      await WestPrescriptionItem.create({ ...item, westPrescriptionId })
    }
  } catch (e) {
    if (westPrescriptionId) WestPrescription.deleteOne({ _id: westPrescriptionId })
    throw e
  }
}

export const eastPrescriptionCreate = async ({ eastPrescription, doctorId, patientId, consultationId, CPrescriptionNo }) => {
  let { overDaysReason, routeAdministrationName, frequencyName, amount, illustration, items = [] } = eastPrescription
  if (!routeAdministrationName) throw new Error('中药处方 用法（用药途径）不能为空')
  if (!frequencyName) throw new Error('中药处方 用药频率 不能为空')
  if (!amount) throw new Error('中药处方 付数 不能为空')
  if (items.length === 0) throw new Error('中药处方条目 不能为空')
  let array = []
  let drugNames = []
  for (let { drugId, onceDose, onceDoseUnitName, amount } of items) {
    if (!drugId) throw new Error('中药处方条目 药品id 不能为空')
    if (!onceDose) throw new Error('中药处方条目 单词用量 不能为空')
    if (!onceDoseUnitName) throw new Error('中药处方条目 单词用量单位 不能为空')
    if (!amount) throw new Error('中药处方条目 用量 不能为空')
    const drug = await Drug.findById(drugId)
    if (!drug) throw new Error('中药处方条目 药品未不存在 drugId: ' + drugId)
    if (drug.type === 0) throw new Error('中药处方条目 药品类型为西药 drugId: ' + drugId)
    array.push({ drugId, onceDose, onceDoseUnitName, amount })
    drugNames.push(drug.name)
  }
  let eastPrescriptionId
  try {
    let eastP = await EastPrescription.create({
      status: 1,
      doctorId,
      patientId,
      consultationId,
      overDaysReason,
      prescriptionNo: CPrescriptionNo,
      drugNames,
      routeAdministrationName,
      frequencyName,
      amount,
      illustration
    })
    eastPrescriptionId = eastP._id
    for (let item of array) {
      await EastPrescriptionItem.create({ ...item, eastPrescriptionId })
    }
    return eastPrescriptionId
  } catch (e) {
    if (eastPrescriptionId) EastPrescription.deleteOne({ _id: eastPrescriptionId })
    throw e
  }
}
