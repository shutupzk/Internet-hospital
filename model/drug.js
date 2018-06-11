import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 单位字典
 * @type {Schema}
 */
const schema = new Schema(
  {
    type: Number, // 类型 0-西药 1-中药
    code: String, // 编码
    name: String, // 名称
    pyCode: String, // 拼音码
    barcode: String, // 条形码
    printName: String, // 商品名
    specification: String, // 规格
    manuFactoryName: String, // 生产厂商
    doseFormName: String, // 剂型
    licenseNo: String, // 国药准字、文号
    onceDose: Number, // 单次剂量
    onceDoseUnitName: String, // 单次剂量单位
    dosage: Number, // 剂量
    dosageUnitName: String, // 剂量单位
    preparationCount: Number, // 制剂数量/包装量
    preparationCountUnitName: String, // 制剂数量单位
    packingUnitName: String, // 药品包装单位
    routeAdministrationName: String, // 用药途径id/默认用法
    frequencyName: String, // 用药频率/默认频次
    defaultRemark: String, // 默认用量用法说明
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Drug = mongoose.model('drug', schema, 'drug')

export { Drug }
