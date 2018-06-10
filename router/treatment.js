import express from 'express'
import { diagnosisUpsert, diagnosisQuery } from '../controller/diagnosis'
const router = express.Router()

router.all('/diagnisis/upsert', diagnosisUpsert)
router.all('/diagnisis/query', diagnosisQuery)

export default router
