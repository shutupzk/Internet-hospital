var fs = require('fs')
var path = require('path')
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

const wechatNativeConfig = {
  appid: 'wxe291762653c64caa',
  mch_id: '1490235832', // 微信支付分配的商户号
  partner_key: 'ndyfyndyfyndyfyndyfy201710171234', // 微信商户平台API密钥
  pfx: fs.readFileSync(path.join(__dirname, 'wechatkeys/apiclient_cert.p12')), // 微信商户平台证书
  pfxStr: path.join(__dirname, 'wechatkeys/apiclient_cert.p12'),
  wechat_spbill_create_ip: '47.93.206.157',
  wechat_notify_url: 'http://47.93.206.157:3000/payment/NATIVE/notify'
}

export { PORT, DB, ImConfig, wechatNativeConfig }
