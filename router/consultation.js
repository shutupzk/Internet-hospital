import express from 'express'
import { createConsultation, createConsultationPayment } from '../controller/consultation'
const router = express.Router()

router.all('/create', createConsultation)
router.all('/payment/create', createConsultationPayment)

export default router
