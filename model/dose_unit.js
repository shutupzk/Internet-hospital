import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 单位字典
 * @type {Schema}
 */
const schema = new Schema(
  {
    code: String, // 编码
    name: String, // 单位名称
    pyCode: String, // 拼音简码
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const DoseUnit = mongoose.model('dose_unit', schema, 'dose_unit')

export { DoseUnit }
