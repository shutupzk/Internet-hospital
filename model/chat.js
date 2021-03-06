import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

/**
 * 会话
 * @type {Schema}
 */
const schema = new Schema(
  {
    type: String, // 01,patientWithDoctor, 02: systemWithUser, 03: systemWithDoctor， 04： systemWithPatient
    patientWithDoctorId: { type: ObjectId, index: true, ref: 'patient_with_doctor' }, // 用户与医生的对话
    systemWithUserId: { type: ObjectId, index: true, ref: 'system_with_user' }, // 系统与用户的对话
    systemWithDoctorId: { type: ObjectId, index: true, ref: 'system_with_doctor' }, // 统统与医生的对话
    systemWithPatientId: { type: ObjectId, index: true, ref: 'system_with_patient' }, // 系统与患者的对话
    consultationId: { type: ObjectId, index: true, ref: 'consultation' }, // 最后一条订单id
    status: { type: Boolean, default: true }, // 会话状态
    lastMsgContent: String, // 回话的最新一条消息
    lastMsgTime: Date, // 回话的最新一条消息的时间
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Chat = mongoose.model('chat', schema, 'chat')

export { Chat }
