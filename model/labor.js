import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 开检验
 * @type {Schema}
 */
const schema = new Schema(
  {
    status: Number, // 1:, 已开具，2:已撤回
    labroNo: String, // 检验编号
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生id
    patientId: { type: ObjectId, index: true, ref: 'patient' }, // 患者id
    consultationId: { type: ObjectId, inexamdex: true, ref: 'consultation' }, // 订单id
    laboratoryDictionaryNames: [String], // 检查项目名称
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Labor = mongoose.model('labor', schema, 'labor')

export { Labor }
