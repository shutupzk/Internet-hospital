import express from 'express'
<<<<<<< HEAD
import { createConsultation, createConsultationPayment } from '../controller/consultation'
const router = express.Router()

router.all('/create', createConsultation)
router.all('/payment/create', createConsultationPayment)
=======
import { createConsultation, updateConsultation, consultationList, consultationChat } from '../controller/consultation'

const router = express.Router()

router.all('/create', createConsultation)
router.all('/update', updateConsultation)
router.all('/list', consultationList)
router.all('/chatmessage', consultationChat)
>>>>>>> 65616542577c177a3c453eaaae247c15a15be1c3

export default router
