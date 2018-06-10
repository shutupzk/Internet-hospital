import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 订单评价详情
 * @type {Schema}
 */
const schema = new Schema(
  {
    value: String,
    evaluateId: { type: ObjectId, ref: 'evaluate' },
    evaluateQuesionId: { type: ObjectId, ref: 'evaluate_quesion' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const EvaluateQuesion = mongoose.model('evaluate_quesion', schema, 'evaluate_quesion')

export { EvaluateQuesion }
