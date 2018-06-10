import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 诊断字典
 * @type {Schema}
 */
const schema = new Schema(
  {
    name: { type: String, index: true }, // 用户与医生的对话
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const DiagnosisDictionary = mongoose.model('diagnosis_dictionary', schema, 'diagnosis_dictionary')

export { DiagnosisDictionary }
