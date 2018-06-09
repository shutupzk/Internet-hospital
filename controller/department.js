import Model, { Department } from '../model'
import result from './result'

export const departmentCreate = async (req, res) => {
  const { deptName, deptCode, weight } = req.body
  if (!deptName) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    const department = await Model.create(Department, { doc: { deptCode, deptName, weight } })
    return result.success(res, department)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

export const departmentLists = async (req, res) => {
  const { keyword, skip, limit } = req.body
  try {
    let ops = {
      deleted_at: { $exists: false }
    }
    if (keyword) {
      const reg = new RegExp(keyword, 'i')
      ops['$or'] = [{ deptName: { $regex: reg } }, { deptCode: { $regex: reg } }]
    }
    console.log('11111', ops)
    const departmentList = await Model.findByOpsWithPage(Department, ops, limit, skip)
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
    const resData = await Model.updateByOps(Department, { _id: departmentId, deleted_at: new Date() })
    return result.success(res, resData)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}
