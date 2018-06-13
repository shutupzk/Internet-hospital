import Model, {
  DiagnosisDictionary,
  ExaminationDictionary,
  ExaminationOrganDictionary,
  ExaminationTypeDictionary,
  LaboratoryDictionary,
  LaboratorySampleDictionary,
  LaboratoryTypeDictionary,
  Drug,
  DrugClass,
  DoseUnit,
  DoseForm,
  ManuFactory,
  Frequency,
  RouteOfAdministration
} from '../model'
import result from './result'
import { formatArrayId, formatObjId } from '../util'

export const diagnosisDictionaryCreate = async (req, res) => {
  const { name } = req.body
  if (!name) return result.body(res, '缺少参数')
  let data = await DiagnosisDictionary.create({ name })
  return result.success(res, data)
}

export const diagnosisDictionaryList = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {}
  if (keyword) ops.name = { $regex: keyword, $options: 'i' }
  let data = await Model.findByOpsWithPage(DiagnosisDictionary, { ops, limit, skip })
  return result.success(res, data)
}

export const examinationDictionargCreate = async (req, res) => {
  const { name, code, pyCode, radiation = false, chargeTotal = null, exeDept = '', exanminationTypeDictianaryId } = req.body
  if (!name || !code || !pyCode || chargeTotal === null) return result.failed(res, '缺少参数')
  let data = await ExaminationDictionary.create({ name, code, pyCode, radiation, exeDept, chargeTotal, exanminationTypeDictianaryId })
  return result.success(res, data)
}

export const examinationDictionargList = async (req, res) => {
  const { keyword, exanminationTypeDictianaryId, limit, skip } = req.body
  let query = {}
  if (exanminationTypeDictianaryId) query.exanminationTypeDictianaryId = exanminationTypeDictianaryId
  if (keyword) query['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  let data = await Model.findByOpsWithPage(ExaminationDictionary, { ops: query, limit, skip })
  return result.success(res, data)
}

export const examinationOrganDictionargCreate = async (req, res) => {
  const { name, code, pyCode } = req.body
  if (!name || !code || !pyCode) return result.failed(res, '缺少参数')
  let data = await ExaminationOrganDictionary.create({ name, code, pyCode })
  return result.success(res, data)
}

export const examinationOrganDictionargList = async (req, res) => {
  let data = await ExaminationOrganDictionary.find({}, ['_id', 'name', 'code', 'pyCode'])
  return result.success(res, data)
}

export const examinationTypeDictionargCreate = async (req, res) => {
  const { name, code, pyCode } = req.body
  if (!name || !code || !pyCode) return result.failed(res, '缺少参数')
  let data = await ExaminationTypeDictionary.create({ name, code, pyCode })
  return result.success(res, data)
}

export const examinationTypeDictionargList = async (req, res) => {
  const { keyword } = req.body
  let query = {}
  if (keyword) query['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  let data = await ExaminationTypeDictionary.find(query, ['_id', 'name', 'code', 'pyCode'])
  return result.success(res, data)
}

export const drugList = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {}
  if (keyword) {
    ops['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { code: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  }
  const drugList = await Model.findDrugByOpsWithPage(Drug, { ops, limit, skip })
  drugList.items = formatArrayId(drugList.items, ['drugClass'])
  for (let item of drugList.items) {
    if (item.drugClass) {
      item.drugClass = formatObjId(item.drugClass)
    }
  }
  return result.success(res, drugList)
}

export const drugClassList = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {}
  if (keyword) {
    ops['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  }
  const drugClassList = await Model.findByOpsWithPage(DrugClass, { ops, limit, skip })
  drugClassList.items = formatArrayId(drugClassList.items)
  return result.success(res, drugClassList)
}

export const doseUnitList = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {}
  if (keyword) {
    ops['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { code: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  }
  const doseUnitList = await Model.findByOpsWithPage(DoseUnit, { ops, limit, skip })
  doseUnitList.items = formatArrayId(doseUnitList.items)

  return result.success(res, doseUnitList)
}

export const doseFormList = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {}
  if (keyword) {
    ops['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { code: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  }
  const doseFormList = await Model.findByOpsWithPage(DoseForm, { ops, limit, skip })
  doseFormList.items = formatArrayId(doseFormList.items)

  return result.success(res, doseFormList)
}

export const manuFactoryList = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {}
  if (keyword) {
    ops['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { code: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  }
  const manuFactoryList = await Model.findByOpsWithPage(ManuFactory, { ops, limit, skip })
  manuFactoryList.items = formatArrayId(manuFactoryList.items)

  return result.success(res, manuFactoryList)
}

export const frequencyList = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {}
  if (keyword) {
    ops['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { code: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  }
  const frequencyList = await Model.findByOpsWithPage(Frequency, { ops, limit, skip })
  frequencyList.items = formatArrayId(frequencyList.items)

  return result.success(res, frequencyList)
}

export const routeAdministrationList = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {}
  if (keyword) {
    ops['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { code: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  }
  const routeAdministrationList = await Model.findByOpsWithPage(RouteOfAdministration, { ops, limit, skip })
  routeAdministrationList.items = formatArrayId(routeAdministrationList.items)

  return result.success(res, routeAdministrationList)
}

export const laboratoryTypeDictionargList = async (req, res) => {
  const { keyword } = req.body
  let query = {}
  if (keyword) query['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  let data = await LaboratoryTypeDictionary.find(query, ['_id', 'name', 'code', 'pyCode'])
  return result.success(res, data)
}

export const laboratorySampleDictionargList = async (req, res) => {
  let data = await LaboratorySampleDictionary.find({}, ['_id', 'name', 'code', 'pyCode'])
  return result.success(res, data)
}

export const laboratoryDictionargList = async (req, res) => {
  const { keyword, laboratoryTypeDictionargId, limit, skip } = req.body
  let query = {}
  if (laboratoryTypeDictionargId) query.laboratoryTypeDictionargId = laboratoryTypeDictionargId
  if (keyword) query['$or'] = [{ name: { $regex: keyword, $options: 'i' } }, { pyCode: { $regex: keyword, $options: 'i' } }]
  let data = await Model.findByOpsWithPage(LaboratoryDictionary, { ops: query, limit, skip })
  return result.success(res, data)
}
