import { User } from '../model'
import jwt from 'jwt-simple'
import { TencentIM, userWechatConfig, doctorWechatConfig } from '../config'
import rp from 'request-promise'
const KEY = '0.9434990896465933'

export const getOpenId = async (req, res) => {
  const { type, code } = req.body
  if (!type || (type !== 'user' && type !== 'doctor')) return res.json({ code: '-1', msg: 'type 为 必须 为 user 或 doctor' })
  if (!code) return res.json({ code: '-1', msg: 'code 不能为空' })
  let param = {}
  if (type === 'user') param = { ...userWechatConfig }
  if (type === 'doctor') param = { ...doctorWechatConfig }
  param.code = code
  let str = ''
  for (let key in param) {
    str += key + '=' + param[key] + '&'
  }
  str += 'grant_type=authorization_code'
  let options = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/sns/jscode2session?' + str
  }
  try {
    console.log(options)
    let wcresStr = await rp(options)
    let wcres = JSON.parse(wcresStr)
    console.log(wcresStr)
    if (wcres.openid && wcres.session_key) {
      return res.json({ code: '200', msg: '操作成功', data: wcres })
    } else {
      return res.json({ code: wcres.errcode, msg: wcres.errmsg })
    }
  } catch (e) {
    console.log(e)
    return res.json({ code: '-1', msg: '获取 openId 失败' })
  }
}

export const userSignup = async (req, res) => {
  const { openId, phone, avatar, name } = req.body
  if (!openId) return res.json({ code: '-1', msg: 'openId 为空' })
  try {
    await TencentIM.accountImport({ Identifier: openId })
    await User.create({ openId, phone, identifier: openId, avatar, name })
  } catch (e) {
    return res.json({ code: '-1', msg: e.message })
  }
  return res.json({ code: '200', msg: '注册成功' })
}

export const userSignin = async (req, res) => {
  const { openId, phone, avatar, name } = req.body
  if (!openId) return res.json({ code: '-1', msg: 'openId 为空' })
  try {
    let user = await User.findOne({ openId })
    if (!user) {
      await TencentIM.accountImport({ Identifier: openId })
      user = await User.create({ openId, phone, identifier: openId, avatar, name })
    }
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
  } catch (e) {
    res.json({ code: '-1', msg: e.message })
  }
}
