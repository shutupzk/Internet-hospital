import mongoose from 'mongoose'
let Schema = mongoose.Schema

/**
 * 系统用户
 * @type {Schema}
 */
const schema = new Schema(
  {
    code: { type: String, index: true, unique: true }, // 编码 01 系统消息， 02： 导诊消息， 03： 支付消息，04： 服务评价消息
    name: String, // 名称
    identifier: String, // im（云通信） identifier
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const System = mongoose.model('system', schema, 'system')

export { System }
