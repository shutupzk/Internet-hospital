import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 检验子表
 * @type {Schema}
 */
const schema = new Schema(
  {
    laborId: { type: ObjectId, index: true, ref: 'labor' }, // 检验id
    status: Number, // '1:, 待缴费，2: 待执行 ，3：已执行, 4：已失效
    laborNo: String, // 检验编号
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生id
    patientId: { type: ObjectId, index: true, ref: 'patient' }, // 患者id
    consultationId: { type: ObjectId, inexamdex: true, ref: 'consultation' },
    laboratoryDictionaryId: { type: ObjectId, index: true, ref: 'laboratory_dictionary' }, // 检验项目id
    laboratorySampleDictionaryId: { type: ObjectId, index: true, ref: 'laboratory_sample_dictionary' }, // 检验物id
    leavingMessage: String, // 留言
    execDept: String, // 执行科室
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const LaborItem = mongoose.model('labor_item', schema, 'labor_item')

export { LaborItem }
