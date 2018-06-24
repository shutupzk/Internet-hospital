import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * 诊断记录 （开诊断）
 * @type {Schema}
 */
const schema = new Schema(
  {
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生id
    patientId: { type: ObjectId, index: true, ref: 'patient' }, // 就诊人id
    consultationId: { type: ObjectId, index: true, ref: 'consultation' }, // 订单id
    mainDiagnosis: { type: String, index: true }, // 医生主诊断
    secondDiagnosis: { type: [String] }, // 副诊断
    chiefComplaint: String, // 主诉
    historyOfPastIllness: String, // 既往史
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Diagnosis = mongoose.model('diagnosis', schema, 'diagnosis')

export { Diagnosis }
