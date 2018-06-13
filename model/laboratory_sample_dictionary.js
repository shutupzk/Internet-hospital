import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 检验物字典
 * @type {Schema}
 */
const schema = new Schema(
  {
    code: { type: String, index: true }, // 编码
    name: { type: String, index: true }, // 名称
    pyCode: { type: String, index: true }, // 拼音编码
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const LaboratorySampleDictionary = mongoose.model('laboratory_sample_dictionary', schema, 'laboratory_sample_dictionary')

export { LaboratorySampleDictionary }
