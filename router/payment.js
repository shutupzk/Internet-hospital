import express from 'express'
import { noticePayment } from '../controller/payment'
const router = express.Router()

router.all('/NATIVE/notice', noticePayment)
