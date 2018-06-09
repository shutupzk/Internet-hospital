import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'
import cors from 'cors'
import router from '../router'
import mongoose from 'mongoose'
import { PORT, DB, ImConfig } from '../config'
import TencentIM from '../libs/tencent_im'

const { mongoUrl, user, pass } = DB

mongoose.Promise = global.Promise

async function startServer() {
  const app = express().use('*', cors())
  const im = new TencentIM(ImConfig)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use((req, res, next) => {
    req.context = { TencentIM: im }
    next()
  })
  await mongoose.connect(
    mongoUrl,
    { user, pass }
  )
  console.log('connect to %s succeed!', mongoUrl)

  app.use('/api', router)

  app.use('/', (req, res) => {
    res.json({
      status: '0k',
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    })
  })

  app.listen(PORT, () => console.log(`server launched, visit http://localhost:${PORT}`))
}

startServer()
  .then(() => {
    console.log('All systems go')
  })
  .catch(e => {
    console.error('Uncaught error in startup')
    console.error(e)
    console.trace(e)
    process.exit()
  })
