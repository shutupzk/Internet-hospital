import mongoose from 'mongoose'
let Schema = mongoose.Schema

/**
 * 用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    openId: { type: String, index: true, unique: true }, // 微信openid
    avatar: String, // 头像
    name: String, // 姓名
    sex: Number, // 性别  0-女，1-男
    phone: String, // 手机号
    identifier: String, // im（云通信） identifier
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const User = mongoose.model('user', schema, 'user')

export { User }
