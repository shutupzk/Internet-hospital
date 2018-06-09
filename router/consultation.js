import express from 'express'
import { createConsultation, updateConsultation, consultationList, consultationChat, createConsultationPayment, consultationReasonCreate, consultationReasonList } from '../controller/consultation'
const router = express.Router()

router.all('/create', createConsultation)
router.all('/payment/create', createConsultationPayment)
router.all('/create', createConsultation)
router.all('/update', updateConsultation)
router.all('/list', consultationList)
router.all('/chatmessage', consultationChat)
router.all('/consultationReason/create', consultationReasonCreate)
router.all('/consultationReason/list', consultationReasonList)

export default router
