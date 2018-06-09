import { System } from '../model'
import result from './result'
import { formatObjId } from '../util'

export const systemCreate = async (req, res) => {
  const { code, name } = req.body
  if (!code || !name) return result.failed(res, '参数错误')
  try {
    let system = await System.findOne({ code })
    if (system) return result.failed(res, '改系统用户 编码 已存在')
    system = await System.create({ code, name })
    return result.success(res, formatObjId(system))
  } catch (e) {
    return result.failed(res, e.message)
  }
}
