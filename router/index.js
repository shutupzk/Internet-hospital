import express from 'express'

import { userSignup, userSignin } from '../controller/user'
import { departmentCreate, departmentLists, departmentDelete } from '../controller/department'
import { doctorCreate, doctorLists } from '../controller/doctor'
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
router.all('/department/list', departmentLists)
router.all('/department/delete', departmentDelete)
router.all('/doctor/create', doctorCreate)
router.all('/doctor/list', doctorLists)
router.all('/chat/create', chatCreate)
router.all('/system/create', systemCreate)
router.all('/user/chat/list', chatUserList)
export default router
