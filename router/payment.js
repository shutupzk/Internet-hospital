import express from 'express'
import { noticePayment, changPayment } from '../controller/payment'
const router = express.Router()

router.all('/NATIVE/notice', noticePayment)
router.all('/testNotify', async (req, res) => {
  const { tradeNo, outTradeNo } = req.body
  let message = {}
  try {
    console.log(' ========== ')
    await changPayment(tradeNo, outTradeNo, message)
  } catch (e) {
    console.log(e)
  }
  return res.json({ ok: 1 })
})

export default router
