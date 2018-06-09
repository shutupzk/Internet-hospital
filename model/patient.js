import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
/**
 * 用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    userId: { type: ObjectId, index: true }, // 用户id
    phone: { type: Number, index: true }, // 手机号
    certificateType: String, // 证件类型，01身份证，02军人证，03户口本，04签证，05护照，06港澳通行证，07市民卡
    certificateNo: { type: String, index: true }, // 证件号
    name: { type: String, index: true }, // 姓名
    sex: Number, // 性别  0-女，1-男
    default: Boolean, // 默认就诊人
    patientIdNo: String, // 就诊卡号
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

schema.index({ userId: 1, certificateNo: 1, name: 1, phone: 1 })

const Patient = mongoose.model('patient', schema)

export { Patient }
