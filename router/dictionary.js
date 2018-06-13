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
  drugList,
  drugClassList,
  doseUnitList,
  doseFormList,
  manuFactoryList,
  frequencyList,
  routeAdministrationList
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

router.all('/drugList', drugList)
router.all('/drugClassList', drugClassList)
router.all('/doseUnitList', doseUnitList)
router.all('/doseFormList', doseFormList)
router.all('/manuFactoryList', manuFactoryList)
router.all('/frequencyList', frequencyList)
router.all('/routeAdministrationList', routeAdministrationList)

export default router
