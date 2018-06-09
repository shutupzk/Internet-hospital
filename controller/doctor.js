import Model, { Doctor, Department } from '../model'
import result from './result'
import { formatArrayId, formatObjId } from '../util'

export const doctorCreate = async (req, res) => {
  const { departmentId, doctorSn, doctorName, weight, avatar, description, imageAndTextOpen = true, imageAndTextPrice = 0, isHot } = req.body
  if (!departmentId || !doctorSn || !doctorName) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    const doctorByCode = await Doctor.findOne({ doctorSn })
    if (doctorByCode) return result.failed(res, '-1', '医生编码已存在')
    const department = await Department.findById(departmentId)
    if (!department) return result.failed(res, '-1', '科室不存在')
    let insertData = { department: departmentId, doctorSn, doctorName, weight, avatar, description, imageAndTextOpen, imageAndTextPrice, isHot }
    const doctor = await Doctor.create(insertData)
    return result.success(res, doctor)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

export const doctorList = async (req, res) => {
  const { departmentId, isHot = null, keyword, skip, limit } = req.body
  try {
    let ops = {
      deleted_at: { $exists: false }
    }
    if (departmentId) ops.departmentId = departmentId
    if (isHot != null) ops.isHot = isHot
    if (keyword) {
      const reg = new RegExp(keyword, 'i')
      const departments = await Department.find({ deptName: { $regex: reg } })
      let departmentIds = []
      for (let department of departments) {
        departmentIds.push(department._id)
      }
      ops['$or'] = [{ doctorName: { $regex: reg } }, { department: { $in: departmentIds } }]
    }
    console.log('ops', ops)
    const doctorList = await Model.findDoctorByOpsWithPage(Doctor, { ops, limit, skip })
    doctorList.items = formatArrayId(doctorList.items, ['department'])
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
    const resData = await Doctor.updateOne({ _id: doctorId }, { deleted_at: new Date() })
    return result.success(res, resData)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}

export const doctorDetail = async (req, res) => {
  const { doctorId } = req.body
  if (!doctorId) {
    return result.failed(res, '-1', '缺少参数')
  }
  try {
    let doctor = await Doctor.findById(doctorId).populate('departmentId')

    doctor = formatObjId(doctor, ['department'])
    return result.success(res, doctor)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}
