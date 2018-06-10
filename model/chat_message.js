import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * 聊天消息
 * @type {Schema}
 */
const schema = new Schema(
  {
    chatId: { type: ObjectId, index: true, ref: 'chat' }, // 会话id
    type: String, // 01: 图文，02： 处方, 03: 检查 04 检验， 06: 咨询申明
    text: String, // 文字
    image: String, // 图片
    audio: String, // 语音
    direction: String, // user->doctor, doctor->user, system->user, system->doctor
    isRetract: Boolean, // 是否撤回
    prescriptionId: { type: ObjectId, index: true, ref: 'perscription' }, // 检验id
    examId: { type: ObjectId, index: true, ref: 'exam' }, // 检查id
    laboraId: { type: ObjectId, index: true, ref: 'labora' }, // 处方id
    consultationId: { type: ObjectId, index: true, ref: 'consultation' }, // 订单id
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

schema.index({ chatId: 1 })

const ChatMessage = mongoose.model('chat_message', schema, 'chat_message')

export { ChatMessage }
