import express from 'express'

import { userSignup, userSignin } from '../controller/user'
import { departmentCreate, departmentList, departmentDelete, departmentDetail } from '../controller/department'
import { doctorCreate, doctorList, doctorDetail, doctorSignin, doctorBind } from '../controller/doctor'
import { patientCreate, patientDelete, patientList, patientDetail, patientBindCard } from '../controller/patient'
import { chatCreate, chatUserList, chatDoctorList } from '../controller/chat'
import { systemCreate } from '../controller/system'
import { quickReplyCreate, quickReplyDelete, quickReplyList } from '../controller/quick_reply'

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
router.all('/doctor/signin', doctorSignin)
router.all('/doctor/bind', doctorBind)
router.all('/chat/create', chatCreate)
router.all('/system/create', systemCreate)
router.all('/user/chat/list', chatUserList)
router.all('/doctor/chat/list', chatDoctorList)
router.all('/doctor/list', doctorList)
router.all('/doctor/detail', doctorDetail)

router.all('/quickReply/create', quickReplyCreate)
router.all('/quickReply/delete', quickReplyDelete)
router.all('/quickReply/list', quickReplyList)
export default router
