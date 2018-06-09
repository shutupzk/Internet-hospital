import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 系统-患者关联表
 * @type {Schema}
 */
const schema = new Schema(
  {
    patientId: { type: ObjectId, index: true, ref: 'patient' }, // 用户id
    userId: { type: ObjectId, index: true, ref: 'user' }, // 用户id
    systemId: { type: ObjectId, index: true, ref: 'system' }, // 系统id
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const SystemWithPatient = mongoose.model('system_with_patient', schema, 'system_with_patient')

export { SystemWithPatient }
