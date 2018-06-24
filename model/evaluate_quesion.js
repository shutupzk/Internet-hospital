import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 订单评价问题/标签
 * @type {Schema}
 */
const schema = new Schema(
  {
    quesion: String, // 标签/问题名称、内容
    type: String, // '01, 打分评价， 02，文字评价'
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
