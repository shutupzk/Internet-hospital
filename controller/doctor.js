import Model, { Doctor, Department } from '../model'
import result from './result'

export const doctorCreate = async (req, res) => {
  const { departmentId, doctorSn, doctorName, weight, avatar, description } = req.body
  if (!departmentId || !doctorSn || !doctorName) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    const department = await Model.findOneById(Department, { id: departmentId })
    if (!department) return result.failed(res, '-1', '科室不存在')
    const doctor = await Model.create(Doctor, { doc: { departmentId, doctorSn, doctorName, weight, avatar, description } })
    return result.success(res, doctor)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

export const doctorLists = async (req, res) => {
  const { keyword, skip, limit } = req.body
  let ops = {
    deleted_at: { $exists: false }
  }
  if (keyword) {
    const reg = new RegExp(keyword, 'i')
    ops['$or'] = [{ doctorName: { $regex: reg } }, { doctorSn: { $regex: reg } }]
  }
  console.log('11111', ops)
  const departmentList = await Model.findByOpsWithPage(Doctor, ops, limit, skip)
  return result.success(res, departmentList)
}

export const doctorDelete = async (req, res) => {
  const { doctorId } = req.body
  if (!doctorId) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    const resData = await Model.updateByOps(Doctor, { _id: doctorId, deleted_at: new Date() })
    return result.success(res, resData)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}
