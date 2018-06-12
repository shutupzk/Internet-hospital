import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 药品类型
 * @type {Schema}
 */
const schema = new Schema(
  {
    name: String,
    pyCode: String,
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const DrugClass = mongoose.model('drug_class', schema, 'drug_class')

export { DrugClass }
