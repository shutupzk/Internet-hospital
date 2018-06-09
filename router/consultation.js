import express from 'express'
import { createConsultation } from '../controller/consultation'
const router = express.Router()

router.all('/create', (req, res) => createConsultation)

export default router
