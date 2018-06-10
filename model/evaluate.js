import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 订单评价
 * @type {Schema}
 */
const schema = new Schema(
  {
    score: String, // 评价分数
    anonymous: Boolean, // 是否匿名
    isShow: Boolean, // 是否显示
    content: String, // 评价内容
    consultationId: { type: ObjectId, ref: 'consultation' },
    doctorId: { type: ObjectId, ref: 'doctor' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Evaluate = mongoose.model('evaluate', schema, 'evaluate')

export { Evaluate }
