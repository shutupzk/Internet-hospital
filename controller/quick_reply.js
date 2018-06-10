import Model, { QuickReply, Doctor } from '../model'
import result from './result'

export const quickReplyCreate = async (req, res) => {
  const { doctorId, title, content } = req.body
  if (!doctorId || !title || !content) return result.failed(res, '缺少参数')
  let doctor = await Doctor.findById(doctorId)
  if (!doctor) return result.failed(res, '未找到指定的医生')
  let data = await QuickReply.create({ doctorId, title, content })
  return result.success(res, data)
}

export const quickReplyDelete = async (req, res) => {
  const { id } = req.body
  if (!id) return result.failed(res, '缺少参数')
  let data = await QuickReply.deleteOne({_id: id})
  return result.success(res, data)
}

export const quickReplyList = async (req, res) => {
  let { doctorId, keyword, skip, limit } = req.body
  let ops = {}
  if (doctorId) ops.doctorId = doctorId
  if (keyword) ops['$or'] = [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }]
  let data = await Model.findByOpsWithPage(QuickReply, { ops, limit, skip })
  return result.success(res, data)
}
