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
  laboratoryDictionargList,
  drugList,
  drugClassList,
  doseUnitList,
  doseFormList,
  manuFactoryList,
  frequencyList,
  routeAdministrationList
} from '../controller/dictionary'
import {
  westPrescriptionModelCreate,
  westPrescriptionModelList,
  westPrescriptionModelItemList,
  eastPrescriptionModelCreate,
  eastPrescriptionModelList,
  eastPrescriptionModelItemList
} from '../controller/prescription_model'

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

router.all('/drugList', drugList)
router.all('/drugClassList', drugClassList)
router.all('/doseUnitList', doseUnitList)
router.all('/doseFormList', doseFormList)
router.all('/manuFactoryList', manuFactoryList)
router.all('/frequencyList', frequencyList)
router.all('/routeAdministrationList', routeAdministrationList)

router.all('/west/prescription/model/create', westPrescriptionModelCreate)
router.all('/west/prescription/model/list', westPrescriptionModelList)
router.all('/west/prescription/model/item/list', westPrescriptionModelItemList)
router.all('/east/prescription/model/create', eastPrescriptionModelCreate)
router.all('/east/prescription/model/list', eastPrescriptionModelList)
router.all('/east/prescription/model/item/list', eastPrescriptionModelItemList)

export default router
