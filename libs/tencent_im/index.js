import rp from 'request-promise'
import Sig from './sig'

const BASE_URL = 'https://console.tim.qq.com/'

export default class TencentIM {
  constructor(config) {
    const { usersig, identifier, sdkappid, private_key_string, public_key_string } = config
    this.config = { usersig, identifier, sdkappid, contenttype: 'json', private_key_string, public_key_string }
    let signConfig = {
      sdk_appid: config.sdkappid,
      expire_after: 180 * 24 * 3600,
      private_key_string: config.private_key_string,
      public_key_string: config.public_key_string
    }
    this.Sig = new Sig.Sig(signConfig)
  }

  // 获取随机数
  getRandom() {
    return Math.ceil(Math.random() * 1000000000)
  }

  // 拼接请求参数
  joinConfig(api) {
    let paramsStr = '?'
    let keys = ['usersig', 'identifier', 'sdkappid', 'contenttype']
    for (let key of keys) {
      paramsStr += key + '=' + this.config[key] + '&'
    }
    paramsStr += 'random=' + this.getRandom()
    return api + paramsStr
  }

  // 请求方法
  async request({ json, api, method = 'POST' }) {
    console.log(json)
    const url = BASE_URL + this.joinConfig(api)
    let options = {
      method,
      url,
      body: JSON.stringify(json)
    }
    try {
      let resStr = await rp(options)
      let res = JSON.parse(resStr)
      if (res.ActionStatus === 'OK') {
        return res
      }
      console.log('res ===========\n', res)
      throw new Error('请求失败')
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  // 获取签名
  genSig({ identifier }) {
    let usersig = this.Sig.getSig(identifier)
    return usersig
  }

  // 验证签名
  verifySig({ usersig, identifier }) {
    return this.Sig.verifySig(usersig, identifier)
  }

  // 独立模式账号导入接口
  accountImport({ Identifier, Nick, FaceUrl, Type = 0 }) {
    return this.request({
      api: 'v4/im_open_login_svc/account_import',
      json: { Identifier, Nick, FaceUrl, Type }
    })
  }

  // 独立模式帐号批量导入接口
  multiaccountImport({ Accounts }) {
    return this.request({
      api: 'v4/im_open_login_svc/multiaccount_import',
      json: { Accounts }
    })
  }

  // 单发单聊消息
  sendmsg({ SyncOtherMachine = 1, From_Account, To_Account, MsgLifeTime = 604800, Text, Title = '标题', Desc = '您收到了一条消息', Ext = '您收到了一条消息' }) {
    let MsgRandom = this.getRandom()
    let MsgBody = [
      {
        MsgType: 'TIMTextElem',
        MsgContent: {
          Text
        }
      }
    ]
    let OfflinePushInfo = {
      PushFlag: 0,
      Title,
      Desc,
      Ext,
      AndroidInfo: {},
      ApnsInfo: {
        BadgeMode: 0
      }
    }
    return this.request({
      api: 'v4/openim/sendmsg',
      json: { SyncOtherMachine, From_Account, To_Account, MsgLifeTime, MsgRandom, MsgBody, OfflinePushInfo }
    })
  }

  // 批量发单聊消息
  batchsendmsg({ SyncOtherMachine = 1, From_Account, To_Account, MsgLifeTime = 604800, Text, Title = '标题', Desc = '您收到了一条消息', Ext = '您收到了一条消息' }) {
    let MsgRandom = this.getRandom()
    let MsgBody = [
      {
        MsgType: 'TIMTextElem',
        MsgContent: {
          Text
        }
      }
    ]
    let OfflinePushInfo = {
      PushFlag: 0,
      Title,
      Desc,
      Ext,
      AndroidInfo: {},
      ApnsInfo: {
        BadgeMode: 0
      }
    }
    return this.request({
      api: 'v4/openim/batchsendmsg',
      json: { SyncOtherMachine, From_Account, To_Account, MsgLifeTime, MsgRandom, MsgBody, OfflinePushInfo }
    })
  }

  // 批量发单聊消息
  getHistory({ ChatType = 'C2C', MsgTime }) {
    return this.request({
      api: 'v4/open_msg_svc/get_history',
      json: { ChatType, MsgTime }
    })
  }
}
