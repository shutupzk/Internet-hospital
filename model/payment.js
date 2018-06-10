import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

/**
 * 支付订单
 * @type {Schema}
 */
const schema = new Schema(
  {
    totalFee: Number, // 金额 单位：分
    outTradeNo: String, // 系统单号
    tradeNo: String, // （微信）订单号
    status: String, // 待支付:WAIT_FOR_PAY,已支付:TRADE_SUCCESS,已退款:REFUND_SUCCESS
    orderInfo: String, // 支付的相关信息
    consultationId: { type: ObjectId, index: true, ref: 'consultation' }, // 订单Id
    payNotifyData: String, // 通知参数
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date }
  },
  {
    versionKey: false // 这个就是处理掉自动插入文档的__v这个属性
  }
)

const Payment = mongoose.model('payment', schema, 'payment')

export { Payment }
