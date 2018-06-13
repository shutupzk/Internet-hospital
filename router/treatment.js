import express from 'express'
import { diagnosisUpsert, diagnosisQuery } from '../controller/diagnosis'
import { examCreate, examQuery, examItemQuery } from '../controller/exam'
import { laborCreate, laborQuery, laborItemQuery } from '../controller/labor'
import { prescriptionCreate, eastPrescriptionList, eastPrescriptionItemList, westPrescriptionList, westPrescriptionItemList } from '../controller/prescription'

const router = express.Router()

router.all('/diagnisis/upsert', diagnosisUpsert)
router.all('/diagnisis/queryByConsultation', diagnosisQuery)

router.all('/exam/create', examCreate)
router.all('/exam/list', examQuery)
router.all('/exam/item/list', examItemQuery)

router.all('/prescription/create', prescriptionCreate)
router.all('/east/prescription/list', eastPrescriptionList)
router.all('/west/prescription/item/list', eastPrescriptionItemList)
router.all('/west/prescription/list', westPrescriptionList)
router.all('/west/prescription/item/list', westPrescriptionItemList)

router.all('/labor/create', laborCreate)
router.all('/labor/list', laborQuery)
router.all('/labor/item/list', laborItemQuery)

export default router
