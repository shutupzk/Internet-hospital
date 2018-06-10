import { Payment, Consultation } from '../model'
import { createTransactionNo } from '../libs/utils'
import { wechatNativeConfig } from '../config'
import { chatPatientWithDoctorCreate } from './chat'
import { consultationSendStartMessage } from './consultation'
import WechatPay from '../libs/wechat'
const wechatPay = new WechatPay({ wechatNativeConfig })

export const createPayment = async (req, res) => {
  const { consultationId } = req.body
  const consultation = await Consultation.findById(consultationId)
  if (!consultation) throw new Error('未找到指定订单')
  const outTradeNo = createTransactionNo()

  let orderInfo = await wechatPay.createAppOrder({ body: '咨询费', out_trade_no: outTradeNo, total_fee: consultation.fee })

  let insertDoc = {
    totalFee: consultation.fee,
    outTradeNo,
    status: 'WAIT_FOR_PAY',
    consultationId,
    orderInfo: JSON.stringify(orderInfo)
  }

  let paymemt = await Payment.create(insertDoc)
  return paymemt
}

export const noticePayment = async (req, res) => {
  try {
    const errorMsg = await wechatPay.veryfy(req)
    let success = !!errorMsg
    await wechatPay.notifyBack(res, success, errorMsg)
    const message = await wechatPay.getNotifyData(req)
    let tradeNo = message.transaction_id
    let outTradeNo = message.out_trade_no
    return changPayment(tradeNo, outTradeNo, message)
  } catch (e) {
    console.log(e)
  }
}

export const changPayment = async (tradeNo, outTradeNo, message) => {
  let paymemt = await Payment.findOne({ outTradeNo })
  if (!paymemt) throw new Error('未找到指定的的支付订单')
  if (paymemt.status !== 'WAIT_FOR_PAY') throw new Error('支付订单已执行过回调')
  await Payment.updateOne({ outTradeNo }, { tradeNo, updated_at: new Date(), status: 'TRADE_SUCCESS', payNotifyData: message })
  if (paymemt.consultationId) {
    let consultation = await Consultation.findById(paymemt.consultationId)
    if (!consultation) throw new Error('未找到指定的订单')
    let chat = await chatPatientWithDoctorCreate(consultation)
    await Consultation.updateOne({ _id: paymemt.consultationId }, { status: '03', payTime: new Date(), chatId: chat._id })
    consultationSendStartMessage(paymemt.consultationId)
  }
}
