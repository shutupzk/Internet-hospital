import express from 'express'
import { diagnosisUpsert, diagnosisQuery } from '../controller/diagnosis'
import { examCreate, examQuery } from '../controller/exam'
const router = express.Router()

router.all('/diagnisis/upsert', diagnosisUpsert)
router.all('/diagnisis/queryByConsultation', diagnosisQuery)

router.all('/exam/create', examCreate)
router.all('/exam/query', examQuery)

export default router
