import { User } from '../model'
import jwt from 'jwt-simple'
import { TencentIM } from '../config'
const KEY = '0.9434990896465933'

export const userSignup = async (req, res) => {
  const { openId, phone } = req.body
  if (!openId) return res.json({ code: '-1', msg: 'openId 为空' })
  try {
    await TencentIM.accountImport({ Identifier: openId })
    await User.create({ openId, phone, identifier: openId })
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
  return res.json({ code: '200', msg: '注册成功' })
}

export const userSignin = async (req, res) => {
  const { openId } = req.body
  const user = await User.findOne({ openId })
  if (!user) return res.json({ code: '-1', msg: '用户不存在' })
  const exp = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24
  const userId = user._id.toString()
  const payload = {
    userId,
    exp
  }
  const { identifier } = user
  let usersig = TencentIM.genSig({ identifier })
  const token = jwt.encode(payload, KEY)
  res.json({ code: '200', token, userId, usersig, identifier })
}
