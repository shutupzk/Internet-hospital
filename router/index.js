import express from 'express'

import { userSignup } from '../controller/user'

const router = express.Router()

router.all('/test', (req, res) => {
  res.json({ ok: '1' })
})

router.all('/user/signup', userSignup)
export default router
