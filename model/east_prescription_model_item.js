import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 中药处方模板item
 * @type {Schema}
 */
const schema = new Schema(
  {
    eastPrescriptionModelId: { type: ObjectId, ref: 'east_prescription_model' }, // 中药处方id
    drugId: { type: ObjectId, ref: 'drug' }, // 中药id
    onceDose: Number, // 单次剂量
    onceDoseUnitName: String, // 单次剂量单位
    amount: Number, // 数量
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const EastPrescriptionModelItem = mongoose.model('east_prescription_model_item', schema, 'east_prescription_model_item')

export { EastPrescriptionModelItem }
