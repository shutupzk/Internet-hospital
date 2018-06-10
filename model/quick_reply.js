import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 快捷回复
 * @type {Schema}
 */
const schema = new Schema(
  {
    title: String, // 标题
    content: String, // 内容
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生Id
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const QuickReply = mongoose.model('quick_reply', schema, 'quick_reply')

export { QuickReply }
