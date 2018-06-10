import Model, { DiagnosisDictionary } from '../model'
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
