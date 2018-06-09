import mongoose from 'mongoose'
let Schema = mongoose.Schema

/**
 * 用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    openId: String,
    password: String,
    created_at: { type: Date, default: Date.now }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const User = mongoose.model('user', schema)

export { User }
