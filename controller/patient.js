import Model, { User, Patient } from '../model'
import moment from 'moment'

export const patientCreate = async (req, res) => {
  let { userId, phone, certificateType = '01', certificateNo, name, birthday, sex, patientIdNo } = req.body
  if (!userId) return res.json({ code: '-1', msg: 'userId 不能为空' })
  if (!phone) return res.json({ code: '-1', msg: 'phone 不能为空' })
  if (!certificateNo) return res.json({ code: '-1', msg: 'certificateNo 不能为空' })
  if (!name) return res.json({ code: '-1', msg: 'name 不能为空' })
  if (!birthday) return res.json({ code: '-1', msg: 'birthday 不能为空' })
  if (!sex) return res.json({ code: '-1', msg: 'sex 不能为空' })
  try {
    let user = await Model.findOneById(User, { id: userId })
    if (!user) return res.json({ code: '-1', msg: '用户不存在' })
    let op = await Model.findOneByOps(Patient, { ops: { userId, certificateNo } })
    if (op) return res.json({ code: '-1', msg: '就诊人已存在' })
    birthday = moment(birthday).format('YYYY-MM-DD')
    let doc = { userId, phone, certificateType, certificateNo, name, birthday, sex, patientIdNo }
    let result = await Model.create(Patient, { doc })
    return res.json({ code: '200', msg: '创建就诊人成功', data: result })
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
}
