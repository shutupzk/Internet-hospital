import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 检验字典
 * @type {Schema}
 */
const schema = new Schema(
  {
    code: { type: String, index: true }, // 检查编码
    name: { type: String, index: true }, // 检查名称
    pyCode: { type: String, index: true }, // 拼音编码
    chargeTotal: Number, // 检验总费用
    exeDept: String, // 执行科室
    LaboratoryTypeDictianaryId: { type: ObjectId, ref: 'laboratory_type_dictionary' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const LaboratoryDictionary = mongoose.model('laboratory_dictionary', schema, 'laboratory_dictionary')

export { LaboratoryDictionary }
