import IM from '../libs/tencent_im'
import fs from 'fs'
import path from 'path'
const PORT = '3000'
const DB = {
  mongoUrl: 'mongodb://47.93.206.157:27017/internet_hospital',
  user: 'internet_hospital',
  pass: 'internet_hospital'
}

const ImConfig = {
  usersig:
    'eJxlj11PgzAYhe-5FYRbjJRCZTXxCp1MxeyLGK5IpaV7MygMKvsw-ncdLpHEc-s8Jyfn0zBN01q-rK5ZntcfSmf62AjLvDUtZF39waYBnjGdeS3-B8WhgVZkrNCiHaBLCMEIjR3gQmko4GIwXoEa4Y5vs2Hjt*--lCkN6GSsgBxg-JCEs0UYJ*UpqFYp9n3nvixoDxvOHk9hKrd6f2jztA8cPVdvJciZjGlEEv9GPdmbZ3e-y7vl0abrQLyLmtkQ7ZKujpzF63Qay7vRpIZKXA7hCfER9twR7UXbQa0GASOXuNhD51jGl-ENbp9dqA__',
  identifier: 'admin',
  accountType: '28795',
  sdkappid: '1400099798',
  private_key_string: fs.readFileSync(path.join(__dirname, 'imkeys/private_key')).toString(),
  public_key_string: fs.readFileSync(path.join(__dirname, 'imkeys/public_key')).toString()
}

const TencentIM = new IM(ImConfig)

const wechatNativeConfig = {
  appid: 'wx13d9d2c1f21960ae',
  mch_id: '1491011342', // 微信支付分配的商户号
  partner_key: '9D2798A5C61845D33B5DBFF55DC8316B', // 微信商户平台API密钥
  pfx: fs.readFileSync(path.join(__dirname, 'wechatkeys/apiclient_cert.p12')), // 微信商户平台证书
  pfxStr: path.join(__dirname, 'wechatkeys/apiclient_cert.p12'),
  wechat_spbill_create_ip: '183.232.39.46',
  wechat_notify_url: 'https://his.hicare365.com/payment/NATIVE/notice'
}

const userWechatConfig = {
  appid: 'wx13d9d2c1f21960ae',
  secret: '80a60bf4837fae4ca89f7529325063e1'
}

const doctorWechatConfig = {
  appid: 'wx083c2a74f4c1cddd',
  secret: 'effb3755b9abae7e34a7df8cf8833814'
}

const SystemParam = {
  chatFinishCountByDoctor: 3,
  chatFinishCountByUser: 20
}

export { PORT, DB, ImConfig, wechatNativeConfig, TencentIM, SystemParam, userWechatConfig, doctorWechatConfig }
