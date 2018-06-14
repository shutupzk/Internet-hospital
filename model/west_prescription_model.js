import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 西药处方模板
 * @type {Schema}
 */
const schema = new Schema(
  {
    name: String,
    type: String, // 0通用，1，个人
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生id
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const WestPrescriptionModel = mongoose.model('west_prescription_model', schema, 'west_prescription_model')

export { WestPrescriptionModel }
