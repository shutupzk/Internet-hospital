import express from 'express'

import { userSignup, userSignin } from '../controller/user'
import { departmentCreate, departmentList, departmentDelete, departmentDetail } from '../controller/department'
import { doctorCreate, doctorList, doctorDetail } from '../controller/doctor'
import { patientCreate, patientDelete, patientList, patientDetail, patientBindCard } from '../controller/patient'
import { chatCreate, chatUserList } from '../controller/chat'
import { systemCreate } from '../controller/system'

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
router.all('/patient/bindcard', patientBindCard)
router.all('/department/create', departmentCreate)
router.all('/department/list', departmentList)
router.all('/department/detail', departmentDetail)
router.all('/department/delete', departmentDelete)
router.all('/doctor/create', doctorCreate)
router.all('/chat/create', chatCreate)
router.all('/system/create', systemCreate)
router.all('/user/chat/list', chatUserList)
router.all('/doctor/list', doctorList)
router.all('/doctor/detail', doctorDetail)
export default router
