import Model, { User, Patient } from '../model'
import moment from 'moment'
import result from './result'
import { subBirthday, subSex, checkIdCard, checkPhoneNumber, formatArrayId, formatObjId } from '../util'

export const patientCreate = async (req, res) => {
  let { userId, phone, certificateType = '01', certificateNo, name, birthday, sex, patientIdNo } = req.body

  if (!userId || !phone || !certificateNo || !name) {
    return result.failed(res, '参数错误')
  }
  if (!checkIdCard(certificateNo)) return result.failed(res, '身份证格式错误')
  if (!checkPhoneNumber(phone)) return result.failed(res, '手机号格式错误')

  if (!birthday) birthday = subBirthday(certificateNo)
  if (!sex) birthday = subSex(subSex)
  try {
    let user = await Model.findOneById(User, { id: userId })
    if (!user) return res.json({ code: '-1', msg: '用户不存在' })
    let op = await Model.findOneByOps(Patient, { ops: { userId, certificateNo, deleted_at: null } })
    if (op) return res.json({ code: '-1', msg: '就诊人已存在' })
    birthday = moment(birthday).format('YYYY-MM-DD')
    let doc = { userId, phone, certificateType, certificateNo, name, birthday, sex, patientIdNo }
    let result = await Model.create(Patient, { doc })
    return res.json({ code: '200', msg: '创建就诊人成功', data: formatObjId(result) })
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
}

export const patientDelete = async (req, res) => {
  const { id } = req.body
  if (!id) return result.failed(res, '参数错我')
  try {
    let patient = await Model.findOneById(Patient, { id })
    if (!patient) return result.failed(res, '就诊人不存在')
    await Model.updateByOps(Patient, { ops: { _id: id }, sets: { deleted_at: new Date() } })
    return result.success(res)
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
}

export const patientList = async (req, res) => {
  const { userId } = req.body
  if (!userId) return result.failed(res, '参数错误')
  try {
    let patients = await Model.findByOps(Patient, { ops: { userId, deleted_at: null } })
    let list = formatArrayId(patients)
    return result.success(res, list)
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
}

export const patientDetail = async (req, res) => {
  const { id } = req.body
  if (!id) return result.failed(res, '参数错误')
  try {
    let patient = await Model.findOneById(Patient, { id })
    return result.success(res, formatObjId(patient))
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
}

export const patientBindCard = async (req, res) => {
  const { id } = req.body
  if (!id) return result.failed(res, '参数错误')
  try {
    let patient = await Model.findOneById(Patient, { id })
    return result.success(res, formatObjId(patient))
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
}
