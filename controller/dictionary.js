import Model, {
  DiagnosisDictionary,
  ExaminationDictionary,
  ExaminationOrganDictionary,
  ExaminationTypeDictionary,
  LaboratoryDictionary,
  LaboratorySampleDictionary,
  LaboratoryTypeDictionary
} from '../model'
import result from './result'

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
