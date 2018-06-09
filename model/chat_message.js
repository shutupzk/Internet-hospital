import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

/**
 * 用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    chatId: { type: ObjectId, index: true }, // 会话id
    type: String, // 01: 图文，02： 处方, 03: 检查 04 检验， 05：结束回话, 06: 咨询申明, 07, 门诊缴费, 08: 住院登记 09: 预约挂号， 10： 加号消息  21:拒绝接单 22:服务评价消息 23:售后评价消息 24: 意见反馈意见
    text: String, // 文字
    image: String, // 图片
    audio: String // 语音
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

schema.index({ chatId: 1 })

const Consultation = mongoose.model('consultation', schema)

export { Consultation }
