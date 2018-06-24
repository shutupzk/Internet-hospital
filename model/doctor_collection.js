import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 医生收藏
 * @type {Schema}
 */
const schema = new Schema(
  {
    doctorId: { type: ObjectId, ref: 'doctor' }, // 医生id
    userId: { type: ObjectId, ref: 'user' }, // 用户id
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const DoctorCollection = mongoose.model('doctor_collection', schema, 'doctor_collection')

export { DoctorCollection }
