import express from 'express'

import { userSignup, userSignin, getOpenId } from '../controller/user'
import { departmentCreate, departmentList, departmentDelete, departmentDetail } from '../controller/department'
import { doctorCreate, doctorList, doctorDetail, doctorSignin, doctorBind } from '../controller/doctor'
import { patientCreate, patientDelete, patientList, patientDetail, patientBindCard } from '../controller/patient'
import { chatCreate, chatUserList, chatDoctorList, chatDetail } from '../controller/chat'
import { systemCreate } from '../controller/system'
import { consultationReasonCreate, consultationReasonList } from '../controller/consultation_reason'
import { evaluateQuesionCreate, evaluateQuesionList } from '../controller/evaluate_quesion'
import { chatMessageCreate, chatMessageList, consultationChatMessageCreate, retractChatMessage } from '../controller/chat_message'
import { quickReplyCreate, quickReplyDelete, quickReplyList } from '../controller/quick_reply'
import { doctorCollectionCreate, doctorCollectionDelete, doctorCollectionList } from '../controller/doctor_collection'
import qiniu from 'qiniu'
const router = express.Router()

router.all('/test', (req, res) => {
  res.json({ ok: '1' })
})

router.all('/qiniu/fileUploadToken', (req, res) => {
  let key = req.query.key || req.body.key || null
  if (!key) return res.json({ code: '-1', msg: '缺少参数 key ' })
  const accessKey = 'BahggXaDR-ythXuGJ-XtswvSbOFr2TJgh9o0Kaf8'
  const secretKey = '7yhMkIoubG-P0NQ5G4QfpECGUJg1AdPAH0O-wj3w'
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  let putPolicy = new qiniu.rs.PutPolicy({ scope: 'haici:' + key })
  res.json({ code: '200', msg: '操作成功', token: putPolicy.uploadToken(mac), expires: putPolicy.expires })
})

router.all('/getOpenId', getOpenId)

router.all('/system/create', systemCreate)

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
router.all('/doctor/list', doctorList)
router.all('/doctor/detail', doctorDetail)

router.all('/consultationReason/create', consultationReasonCreate)
router.all('/consultationReason/list', consultationReasonList)

router.all('/evaluateQuesion/create', evaluateQuesionCreate)
router.all('/evaluateQuesion/list', evaluateQuesionList)

router.all('/quickReply/create', quickReplyCreate)
router.all('/quickReply/delete', quickReplyDelete)
router.all('/quickReply/list', quickReplyList)

router.all('/chat/create', chatCreate)
router.all('/chat/user/list', chatUserList)
router.all('/chat/doctor/list', chatDoctorList)
router.all('/chat/detail', chatDetail)
router.all('/chat/message/create', chatMessageCreate)
router.all('/chat/message/list', chatMessageList)
router.all('/consultation/chat/message/create', consultationChatMessageCreate)
router.all('/consultation/chat/message/retract', retractChatMessage)

router.all('/doctorCollection/create', doctorCollectionCreate)
router.all('/doctorCollection/delete', doctorCollectionDelete)
router.all('/doctorCollection/list', doctorCollectionList)

export default router
