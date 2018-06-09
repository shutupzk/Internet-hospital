import express from 'express'

import { userSignup, userSignin } from '../controller/user'
import { departmentCreate, departmentLists, departmentDelete } from '../controller/department'
import { doctorCreate, doctorLists } from '../controller/doctor'
import { patientCreate, patientDelete, patientList, patientDetail } from '../controller/patient'

const router = express.Router()

router.all('/test', (req, res) => {
  res.json({ ok: '1' })
})

router.all('/user/signup', userSignup)
router.all('/user/signin', userSignin)
router.all('/patient/create', patientCreate)
router.all('/patient/delete', patientDelete)
router.all('/patient/list', patientList)
router.all('/patient/detail', patientDetail)

router.all('/department/create', departmentCreate)
router.all('/department/list', departmentLists)
router.all('/department/delete', departmentDelete)
router.all('/doctor/create', doctorCreate)
router.all('/doctor/list', doctorLists)
export default router
