import mongoose from 'mongoose'
const Schema = mongoose.Schema

/**
 * 生产厂商字典
 * @type {Schema}
 */
const schema = new Schema(
  {
    code: String, // 编码
    name: String, // 厂商名称
    pyCode: String, // 拼音简码
    created_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const ManuFactory = mongoose.model('manu_factory', schema, 'manu_factory')

export { ManuFactory }
