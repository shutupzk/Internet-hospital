import Model, { WestPrescriptionModel, WestPrescriptionModelItem, EastPrescriptionModel, EastPrescriptionModelItem, Doctor, Drug } from '../model'
import result from './result'
import { formatArrayId, formatObjId } from '../util'

export const westPrescriptionModelCreate = async (req, res) => {
  let { name, type, doctorId, items = [] } = req.body
  if (!name || !type || !items.length) return result.failed(res, '参数错误')
  if (type !== '0' && type !== '1') return result.failed(res, 'type 只能为 0（通用）， 1（个人） ')
  if (type === '1' && !doctorId) return result.failed(res, '个人模板请 选择 doctorId ')
  let westPrescriptionModelId
  try {
    if (doctorId) {
      let doctor = Doctor.findById(doctorId)
      if (!doctor) return result.failed(res, '医生不存在')
    }
    let westPrescriptionModel = await WestPrescriptionModel.create({ name, type, doctorId })
    westPrescriptionModelId = westPrescriptionModel._id
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
      await WestPrescriptionModelItem.create({ drugId, onceDose, onceDoseUnitName, routeAdministrationName, frequencyName, illustration, amount, westPrescriptionModelId })
    }
    return result.success(res)
  } catch (e) {
    if (westPrescriptionModelId) WestPrescriptionModel.deleteOne({ _id: westPrescriptionModelId })
    return result.failed(res, e.message)
  }
}

export const eastPrescriptionModelCreate = async (req, res) => {
  let { name, type, doctorId, routeAdministrationName, frequencyName, amount, illustration, items = [] } = req.body
  if (!name || !type || !items.length || !routeAdministrationName || !frequencyName || !amount) return result.failed(res, '参数错误')
  if (type !== '0' && type !== '1') return result.failed(res, 'type 只能为 0（通用）， 1（个人） ')
  if (type === '1' && !doctorId) return result.failed(res, '个人模板请 选择 doctorId ')
  let eastPrescriptionModelId
  try {
    if (doctorId) {
      let doctor = Doctor.findById(doctorId)
      if (!doctor) return result.failed(res, '医生不存在')
    }
    let eastPrescriptionModel = await EastPrescriptionModel.create({ name, type, doctorId, routeAdministrationName, frequencyName, amount, illustration })
    eastPrescriptionModelId = eastPrescriptionModel._id
    for (let { drugId, onceDose, onceDoseUnitName, amount } of items) {
      if (!drugId) throw new Error('中药处方条目 药品id 不能为空')
      if (!onceDose) throw new Error('中药处方条目 单词用量 不能为空')
      if (!onceDoseUnitName) throw new Error('中药处方条目 单词用量单位 不能为空')
      if (!amount) throw new Error('中药处方条目 用量 不能为空')
      const drug = await Drug.findById(drugId)
      if (!drug) throw new Error('中药处方条目 药品未不存在 drugId: ' + drugId)
      if (drug.type === 0) throw new Error('中药处方条目 药品类型为西药 drugId: ' + drugId)
      await EastPrescriptionModelItem.create({ drugId, onceDose, onceDoseUnitName, amount, eastPrescriptionModelId })
    }
    return result.success(res)
  } catch (e) {
    if (eastPrescriptionModelId) EastPrescriptionModel.deleteOne({ _id: eastPrescriptionModelId })
    return result.failed(res, e.message)
  }
}

export const westPrescriptionModelList = async (req, res) => {
  let { type, doctorId, keyword, skip, limit } = req.body
  if (!doctorId) return result.failed(res, '参数错误')
  let ops = {}
  if (!type) {
    ops['$or'] = [{ type: '0' }, { doctorId, type: '1' }]
  } else {
    ops.type = type
    if (type === '1') {
      ops.doctorId = doctorId
    }
  }
  if (keyword) {
    ops.name = { $regex: keyword, $options: 'i' }
  }
  let data = await Model.findByOpsWithPage(WestPrescriptionModel, { ops, limit, skip, sort: { _id: -1 } })
  let items = formatArrayId(data.items)
  return result.success(res, { items, page_info: data.page_info })
}

export const eastPrescriptionModelList = async (req, res) => {
  let { type, doctorId, keyword, skip, limit } = req.body
  if (!doctorId) return result.failed(res, '参数错误')
  let ops = {}
  if (!type) {
    ops['$or'] = [{ type: '0' }, { doctorId, type: '1' }]
  } else {
    ops.type = type
    if (type === '1') {
      ops.doctorId = doctorId
    }
  }
  if (keyword) {
    ops.name = { $regex: keyword, $options: 'i' }
  }
  let data = await Model.findByOpsWithPage(EastPrescriptionModel, { ops, limit, skip, sort: { _id: -1 } })
  let items = formatArrayId(data.items)
  return result.success(res, { items, page_info: data.page_info })
}

export const westPrescriptionModelItemList = async (req, res) => {
  const { westPrescriptionModelId } = req.body
  if (!westPrescriptionModelId) return result.failed(res, '参数错误')
  let items = await WestPrescriptionModelItem.find({ westPrescriptionModelId }).populate({path: 'drugId', select: '_id name specification'})
  let array = []
  for (let item of items) {
    let obj = { ...item._doc }
    obj.id = item._id
    delete obj._id
    obj.drug = formatObjId(item.drugId)
    delete obj.drugId
    array.push(obj)
  }
  return result.success(res, array)
}

export const eastPrescriptionModelItemList = async (req, res) => {
  const { eastPrescriptionModelId } = req.body
  if (!eastPrescriptionModelId) return result.failed(res, '参数错误')
  let items = await EastPrescriptionModelItem.find({ eastPrescriptionModelId }).populate({path: 'drugId', select: '_id name specification'})
  let array = []
  for (let item of items) {
    let obj = { ...item._doc }
    obj.id = item._id
    delete obj._id
    obj.drug = formatObjId(item.drugId)
    delete obj.drugId
    array.push(obj)
  }
  return result.success(res, array)
}
