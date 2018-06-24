import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 问诊原因
 * @type {Schema}
 */
const schema = new Schema(
  {
    reason: String, // 问诊原因
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const ConsultationReason = mongoose.model('consultation_reason', schema, 'consultation_reason')

export { ConsultationReason }
