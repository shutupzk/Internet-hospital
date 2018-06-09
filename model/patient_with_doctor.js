import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * 用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    patientId: { type: ObjectId, index: true, ref: 'patient' }, // 患者
    userId: { type: ObjectId, index: true, ref: 'user' }, // 用户
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const patientWithDoctor = mongoose.model('patient_with_doctor', schema, 'patient_with_doctor')

export { patientWithDoctor }
