import Model, { Department } from '../model'
import result from './result'
import { formatArrayId, formatObjId } from '../util'

export const departmentCreate = async (req, res) => {
  const { deptName, deptCode, weight } = req.body
  if (!deptName || !deptCode) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    const departmentByCode = await Department.findOne({ deptCode })
    const departmentByName = await Department.findOne({ deptName })
    if (departmentByCode) return result.failed(res, '-1', '科室编码已存在')
    if (departmentByName) return result.failed(res, '-1', '科室名称已存在')
    const department = await Department.create({ deptCode, deptName, weight })
    return result.success(res, department)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

export const departmentList = async (req, res) => {
  const { keyword, skip, limit, isHot = null } = req.body
  try {
    let ops = {
      deleted_at: { $exists: false }
    }
    if (keyword) {
      const reg = new RegExp(keyword, 'i')
      ops.deptName = { $regex: reg }
    }
    if (isHot != null) ops.isHot = isHot
    const departmentList = await Model.findByOpsWithPage(Department, { ops, limit, skip })
    departmentList.items = formatArrayId(departmentList.items)
    return result.success(res, departmentList)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

export const departmentDelete = async (req, res) => {
  const { departmentId } = req.body
  if (!departmentId) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    const resData = await Department.updateOne({ _id: departmentId }, { deleted_at: new Date() })
    return result.success(res, resData)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

export const departmentDetail = async (req, res) => {
  const { departmentId } = req.body
  if (!departmentId) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    let department = await Department.findById(departmentId)
    department = formatObjId(department)
    return result.success(res, department)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}
