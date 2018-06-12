import express from 'express'
import { diagnosisUpsert, diagnosisQuery } from '../controller/diagnosis'
import { examCreate, examQuery, examItemQuery } from '../controller/exam'
const router = express.Router()

router.all('/diagnisis/upsert', diagnosisUpsert)
router.all('/diagnisis/queryByConsultation', diagnosisQuery)

router.all('/exam/create', examCreate)
router.all('/exam/list', examQuery)
router.all('/exam/item/list', examItemQuery)

export default router
