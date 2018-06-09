import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

/**
 * 用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    type: String, // 01,patientWithDoctor, 02: systemWithUser, 03: systemWithDoctor
    patientWithDoctor: ObjectId, // 用户与医生的对话
    systemWithUser: ObjectId, // 系统与医生的对话
    systemWithDoctor: ObjectId, // 统统与医生的对话
    status: { type: Boolean, default: true }, // 会话状态
    created_at: { type: Date, default: Date.now }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Chat = mongoose.model('chat', schema)

export { Chat }
