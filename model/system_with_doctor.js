import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生id
    systemId: { type: ObjectId, index: true, ref: 'system' }, // 系统id
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const SystemWithDoctor = mongoose.model('system_with_doctor', schema, 'system_with_doctor')

export { SystemWithDoctor }
