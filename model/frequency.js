import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 频率字典
 * @type {Schema}
 */
const schema = new Schema(
  {
    code: String,
    name: String,
    pyCode: String,
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Frequency = mongoose.model('frequency', schema, 'frequency')

export { Frequency }
