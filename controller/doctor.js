import Model, { Doctor, Department } from '../model'
import result from './result'
import { formatArrayId, formatObjId } from '../util'

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

export const doctorList = async (req, res) => {
  const { departmentId, keyword, skip, limit } = req.body
  try {
    let ops = {
      deleted_at: { $exists: false }
    }
    if (departmentId) ops.departmentId = departmentId
    if (keyword) {
      const reg = new RegExp(keyword, 'i')
      ops['$or'] = [{ doctorName: { $regex: reg } }, { doctorSn: { $regex: reg } }]
    }
    console.log('11111', ops)
    const doctorList = await Model.findByOpsWithPage(Doctor, {ops, limit, skip})
    doctorList.items = formatArrayId(doctorList.items)
    return result.success(res, doctorList)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
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

export const departmentDetail = async (req, res) => {
  const { doctorId } = req.body
  if (!doctorId) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    let doctor = await Model.findOneById(Doctor, { id: doctorId })
    doctor = formatObjId(doctor)
    return result.success(res, doctor)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}
