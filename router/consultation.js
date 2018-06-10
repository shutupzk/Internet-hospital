import express from 'express'
import { createConsultation, updateConsultation, consultationList, consultationChat, createConsultationPayment, consultationDetail } from '../controller/consultation'
import { evaluateCreate, evaluateList } from '../controller/evaluate'
const router = express.Router()

router.all('/create', createConsultation)
router.all('/update', updateConsultation)
router.all('/list', consultationList)
router.all('/detail', consultationDetail)
router.all('/chatmessage', consultationChat)
router.all('/payment/create', createConsultationPayment)

router.all('/evaluate/create', evaluateCreate)
router.all('/evaluate/list', evaluateList)

export default router
