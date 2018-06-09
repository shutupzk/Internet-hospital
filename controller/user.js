import Model, { User } from '../model'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 10

export const userSignup = async (req, res) => {
  const { openId, password, phone } = req.body
  if (!openId) return res.json({ code: '-1', msg: 'openId 为空' })
  if (!password) return res.json({ code: '-1', msg: 'password 为空' })
  const { TencentIM } = req.context
  const hash = await bcrypt.hash(password, SALT_ROUNDS)
  try {
    await TencentIM.accountImport({ Identifier: openId })
    await Model.save(User, { doc: { openId, hash, phone } })
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
  return res.json({ code: '200', msg: '注册成功' })
}

export const userSignin = (req, res) => {
  res.json({ ok: 1 })
}
