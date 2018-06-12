import mongoose from 'mongoose'
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 开检查
 * @type {Schema}
 */
const schema = new Schema(
  {
    examId: { type: ObjectId, index: true, ref: 'exam' }, // 检查id
    status: Number, // '1:, 待缴费，2: 待执行 ，3：已执行, 4：已失效
    examNo: String, // 检查编号
    doctorId: { type: ObjectId, index: true, ref: 'doctor' }, // 医生id
    patientId: { type: ObjectId, index: true, ref: 'patient' }, // 患者id
    consultationId: { type: ObjectId, inexamdex: true, ref: 'consultation' },
    examinationDictionaryid: { type: ObjectId, index: true, ref: 'examination_dictionary' },
    examinationOrganDictionaryids: [{ type: ObjectId, index: true, ref: 'examination_organ_dictionary' }],
    leavingMessage: String, // 留言
    execDept: String, // 执行科室
    height: String, // 身高(cm)
    weight: String, // 体重(kg)
    radiationDeptSn: String, // 放射科号
    liverNormal: Number, // -1-否, 0-不详, 1-是  肝功能
    iodineAllergy: Number, // -1-否, 0-不详, 1-是  碘过敏
    hasHeavyMetal: Number, // -1-无, 1-有  是否有重金属
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const ExamItem = mongoose.model('exam_item', schema, 'exam_item')

export { ExamItem }
