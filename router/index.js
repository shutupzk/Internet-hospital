import express from 'express'

import { userSignup, userSignin } from '../controller/user'
import { patientCreate, patientDelete, patientList } from '../controller/patient'

const router = express.Router()

router.all('/test', (req, res) => {
  res.json({ ok: '1' })
})

router.all('/user/signup', userSignup)
router.all('/user/signin', userSignin)
router.all('/patient/create', patientCreate)
router.all('/patient/delete', patientDelete)
router.all('/patient/list', patientList)
export default router
