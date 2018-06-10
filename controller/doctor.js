import Model, { Doctor, Department } from '../model'
import result from './result'
import { formatArrayId, formatObjId, md5 } from '../util'
import jwt from 'jwt-simple'
import { TencentIM } from '../config'
const KEY = '0.9434990896465933'

export const doctorCreate = async (req, res) => {
  let { departmentId, doctorSn, doctorName, weight, avatar, description, imageAndTextOpen = true, imageAndTextPrice = 0, isHot, password, special, title, workExperience } = req.body
  if (!departmentId || !doctorSn || !doctorName || !password) {
    return result.failed(res, '-1', '缺少参数')
  }
  const { TencentIM } = req.context

  try {
    password = md5(password)
    const doctorByCode = await Doctor.findOne({ doctorSn })
    if (doctorByCode) return result.failed(res, '-1', '医生编码已存在')
    const department = await Department.findById(departmentId)
    if (!department) return result.failed(res, '-1', '科室不存在')
    await TencentIM.accountImport({ Identifier: 'doctor-' + doctorSn })
    let identifier = 'doctor-' + doctorSn
    let insertData = { department: departmentId, doctorSn, doctorName, weight, avatar, description, imageAndTextOpen, imageAndTextPrice, isHot, password, identifier, special, title, workExperience }
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

export const doctorSignin = async (req, res) => {
  const { openId } = req.body
  const doctor = await Doctor.findOne({ openId })
  if (!doctor) return res.json({ code: '-1', msg: '用户不存在' })
  const exp = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24
  const doctorId = doctor._id.toString()
  const payload = {
    doctorId,
    exp
  }
  let usersig = TencentIM.genSig({ identifier: doctor.identifier })
  const token = jwt.encode(payload, KEY)
  res.json({ code: '200', token, doctorId, usersig, identifier: doctor.identifier })
}

export const doctorBind = async (req, res) => {
  let { openId, doctorSn, password } = req.body
  if (!openId || !doctorSn || !password) return result.failed(res, '-1', '缺少参数')
  password = md5(password)

  const doctor = await Doctor.findOne({ doctorSn })
  if (!doctor) return res.json({ code: '-1', msg: '账号不存在' })
  if (password !== doctor.password) return res.json({ code: '-1', msg: '密码不正确' })
  if (doctor.openId) return result.failed(res, '-1', '该账号已绑定，请直接登录')

  try {
    await Doctor.updateOne({ doctorSn }, { openId })
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
  return res.json({ code: '200', msg: '绑定成功' })
}
