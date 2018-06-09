import mongoose from 'mongoose'
let Schema = mongoose.Schema

/**
 * 科室
 * @type {Schema}
 */
const schema = new Schema(
  {
    deptName: String, // 部门名称
    deptCode: String, // 部门编码
    description: String, // 部门描述
    deptPic: String, // 部门图标
    deptType: String, // 科室类型
    isHot: String, // 是否热门
    deptLevel: String, // 部门等级
    deptAddress: String, // 部门地址
    weight: Number, // 部门权重
    deptStrength: String, // 科室特色
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: Date
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Department = mongoose.model('department', schema, 'department')

export { Department }
