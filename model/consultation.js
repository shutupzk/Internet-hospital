import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

/**
 * 用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    consultationNo: { type: String, index: true }, // 订单编号
    content: String, // 咨询内容
    images: [String], // 咨询图片
    fee: Number, // 咨询费用
    status: String, // 01：待支付，02：已取消，03：待执行，04：执行中，05：已过期未退款，06：待执行退款申请，07：已完成，08：过期已退款，09:待执行订单已退款
    payTime: Date, // 支付时间
    excTime: Date, // 执行时间
    finishTime: Date, // 完成时间
    evaluated: { type: Boolean, default: false }, // 是否评价
    patientId: { type: ObjectId, index: true }, // 患者id
    doctorId: { type: ObjectId, index: true }, // 医生Id
    paymentId: ObjectId, // 支付订单id
    chatId: ObjectId, // 关联的聊天Id
    created_at: { type: Date, default: Date.now }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

schema.index({ patientId: 1, doctorId: 1, consultationNo: 1 })

const Consultation = mongoose.model('consultation', schema)

export { Consultation }
