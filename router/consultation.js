import express from 'express'
import { createConsultation, updateConsultation, consultationList, consultationChat } from '../controller/consultation'

const router = express.Router()

router.all('/create', createConsultation)
router.all('/update', updateConsultation)
router.all('/list', consultationList)
router.all('/chatmessage', consultationChat)

export default router
