import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 西药处方模板item
 * @type {Schema}
 */
const schema = new Schema(
  {
    westPrescriptionModelId: { type: ObjectId, ref: 'west_prescription_model' }, // 西药处方模板id
    drugId: { type: ObjectId, ref: 'drug' }, // 西药id
    onceDose: Number, // 单次剂量
    onceDoseUnitName: String, // 单次剂量单位
    routeAdministrationName: String, // 用法
    frequencyName: String, // 用药频率/默认频次
    illustration: String, // 医嘱
    amount: Number, // 数量
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const WestPrescriptionModelItem = mongoose.model('west_prescription_model_item', schema, 'west_prescription_model_item')

export { WestPrescriptionModelItem }
