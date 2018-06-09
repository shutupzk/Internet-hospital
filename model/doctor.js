import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 医生
 * @type {Schema}
 */
const schema = new Schema(
  {
    doctorSn: String, // 医生编码
    doctorName: String, // 医生姓名
    departmentId: { type: ObjectId, ref: 'department' }, // 所属科室id
    weight: Number, // 医生权重
    avatar: String, // 医生头像地址
    description: String, // 医生描述
    doctorType: String, // 医生类型
    special: String, // 医生主治
    phone: String, // 医生手机号
    title: String, // 医生职称
    workExperience: String, // 医生工作经验
    isHot: Boolean, // 是否热门
    sex: String, // 医生性别
    address: String, // 诊室地址
    shortName: String, // 医生的字母简拼
    remark: String, // 备注
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: Date
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Doctor = mongoose.model('doctor', schema, 'doctor')

export { Doctor }
