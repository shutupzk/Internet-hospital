import express from 'express'
import { diagnosisDictionaryCreate, diagnosisDictionaryList } from '../controller/dictionary'
const router = express.Router()

router.all('/diagnosis/create', diagnosisDictionaryCreate)
router.all('/diagnosis/list', diagnosisDictionaryList)

export default router
