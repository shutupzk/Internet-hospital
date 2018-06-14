import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 开中药处方
 * @type {Schema}
 */
const schema = new Schema(
  {
    status: Number, // 1:, 已开具，2:已撤回
    prescriptionNo: String, // 处方编号
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生id
    patientId: { type: ObjectId, index: true, ref: 'patient' }, // 患者id
    consultationId: { type: ObjectId, inexamdex: true, ref: 'consultation' }, // 订单id
    overDaysReason: String, // 天数超限原因
    drugNames: [String], // 药品名称
    routeAdministrationName: String, // 用法
    frequencyName: String, // 用药频率/默认频次
    amount: Number, // 付数
    illustration: String, // 医嘱
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const EastPrescription = mongoose.model('east_prescription', schema, 'east_prescription')

export { EastPrescription }
