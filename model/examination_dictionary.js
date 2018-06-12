import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 检查字典
 * @type {Schema}
 */
const schema = new Schema(
  {
    code: { type: String, index: true }, // 检查编码
    name: { type: String, index: true }, // 检查名称
    pyCode: { type: String, index: true }, // 拼音编码
    radiation: Boolean, // 需要补充填写放射号的检查项目
    chargeTotal: Number, // 检查总费用
    exeDept: String, // 执行科室
    exanminationTypeDictianaryId: { type: ObjectId, ref: 'examination_type_dictionary' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const ExaminationDictionary = mongoose.model('examination_dictionary', schema, 'examination_dictionary')

export { ExaminationDictionary }
