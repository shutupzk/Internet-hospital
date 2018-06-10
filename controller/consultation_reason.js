import { ConsultationReason } from '../model'
import result from './result'
import { formatArrayId, formatObjId } from '../util'

export const consultationReasonCreate = async (req, res) => {
  const reason = req.body.reason
  if (!reason) return result.failed(res, '缺少参数')
  try {
    let consultationReason = await ConsultationReason.create({ reason })
    consultationReason = formatObjId(consultationReason)
    return result.success(res, consultationReason)
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const consultationReasonList = async (req, res) => {
  try {
    let ops = {
      deleted_at: { $exists: false }
    }

    let consultationReasonList = await ConsultationReason.find(ops)
    consultationReasonList = formatArrayId(consultationReasonList)
    return result.success(res, consultationReasonList)
  } catch (e) {
    return result.failed(res, e.message)
  }
}
