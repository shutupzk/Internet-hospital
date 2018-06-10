import { EvaluateQuesion } from '../model'
import result from './result'
import { formatArrayId, formatObjId } from '../util'

export const evaluateQuesionCreate = async (req, res) => {
  const { quesion, type } = req.body
  if (!quesion || !type) return result.failed(res, '缺少参数')
  try {
    let evaluateQuesion = await EvaluateQuesion.create({ quesion, type })
    evaluateQuesion = formatObjId(evaluateQuesion)
    return result.success(res, evaluateQuesion)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const evaluateQuesionList = async (req, res) => {
  try {
    let ops = {
      deleted_at: { $exists: false }
    }

    let evaluateQuesionList = await EvaluateQuesion.find(ops)
    evaluateQuesionList = formatArrayId(evaluateQuesionList)
    return result.success(res, evaluateQuesionList)
  } catch (e) {
    return result.failed(res, e.message)
  }
}
