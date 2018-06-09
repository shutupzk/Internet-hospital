import { User } from '../model'
import jwt from 'jwt-simple'
const KEY = '0.9434990896465933'

export const userSignup = async (req, res) => {
  const { openId, phone } = req.body
  if (!openId) return res.json({ code: '-1', msg: 'openId 为空' })
  const { TencentIM } = req.context
  try {
    await TencentIM.accountImport({ Identifier: openId })
    await User.create({ openId, phone })
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
  return res.json({ code: '200', msg: '注册成功' })
}

export const userSignin = async (req, res) => {
  const { openId } = req.body
  const { TencentIM } = req.context
  const user = await User.findOne({ openId })
  if (!user) return res.json({ code: '-1', msg: '用户不存在' })
  const exp = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24
  const userId = user._id.toString()
  const payload = {
    userId,
    exp
  }
  let usersig = TencentIM.genSig({ identifier: openId })
  const token = jwt.encode(payload, KEY)
  res.json({ code: '200', token, userId, usersig, identifier: openId })
}
