import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 订单评价详情
 * @type {Schema}
 */
const schema = new Schema(
  {
    value: String, // '01, 打分评价时的分数 02，文字评价时的评价内容
    evaluateId: { type: ObjectId, ref: 'evaluate' }, // 评价id
    evaluateQuesionId: { type: ObjectId, ref: 'evaluate_quesion' }, // 评价标签id
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const EvaluateDetail = mongoose.model('evaluate_detail', schema, 'evaluate_detail')

export { EvaluateDetail }
