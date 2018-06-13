import express from 'express'
import {
  diagnosisDictionaryCreate,
  diagnosisDictionaryList,
  examinationDictionargCreate,
  examinationOrganDictionargCreate,
  examinationTypeDictionargCreate,
  examinationTypeDictionargList,
  examinationOrganDictionargList,
  examinationDictionargList,
  laboratoryTypeDictionargList,
  laboratorySampleDictionargList,
  laboratoryDictionargList
} from '../controller/dictionary'
const router = express.Router()

router.all('/diagnosis/create', diagnosisDictionaryCreate)
router.all('/diagnosis/list', diagnosisDictionaryList)

router.all('/examination/create', examinationDictionargCreate)
router.all('/examination/list', examinationDictionargList)
router.all('/examination/type/create', examinationTypeDictionargCreate)
router.all('/examination/type/list', examinationTypeDictionargList)
router.all('/examination/organ/create', examinationOrganDictionargCreate)
router.all('/examination/organ/list', examinationOrganDictionargList)

router.all('/laboratory/type/list', laboratoryTypeDictionargList)
router.all('/laboratory/sample/list', laboratorySampleDictionargList)
router.all('/laboratory/list', laboratoryDictionargList)

export default router
