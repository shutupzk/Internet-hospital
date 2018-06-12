import express from 'express'
import path from 'path'
import xlsx from 'node-xlsx'
import { DoseForm, DoseUnit, Frequency, RouteOfAdministration, Drug, ManuFactory } from '../model'
const router = express.Router()

router.all('/doseform', async (req, res) => {
  let filePath = path.join(`${__dirname}`, '../excels/doseForm.xlsx')
  console.log(filePath)
  const doseForms = xlsx.parse(filePath)[0].data
  try {
    for (let i = 2; i < doseForms.length; i++) {
      const obj = doseForms[i]
      if (obj[4] && obj[2] && obj[0]) {
        let doc = {
          code: obj[4].trim(),
          name: obj[2],
          pyCode: obj[0],
          created_at: new Date(),
          deleted_at: new Date()
        }
        console.log(i)
        DoseForm.findOneAndUpdate({ code: doc.code }, doc, { upsert: true, rawResult: true, new: true })
      }
    }
  } catch (e) {
    return res.json({ err: e.message })
  }
  res.json({ ok: 1 })
})

router.all('/doseUnit', async (req, res) => {
  let filePath = path.join(`${__dirname}`, '../excels/doseUnit.xlsx')
  console.log(filePath)
  const doseUnits = xlsx.parse(filePath)[0].data
  try {
    for (let i = 2; i < doseUnits.length; i++) {
      const obj = doseUnits[i]
      if (obj[4] && obj[2] && obj[0]) {
        let doc = {
          code: obj[4].trim(),
          name: obj[2],
          pyCode: obj[0],
          created_at: new Date(),
          deleted_at: new Date()
        }
        console.log(i)
        DoseUnit.findOneAndUpdate({ code: doc.code }, doc, { upsert: true, rawResult: true, new: true })
      }
    }
  } catch (e) {
    return res.json({ err: e.message })
  }
  res.json({ ok: 1 })
})

router.all('/frequency', async (req, res) => {
  let filePath = path.join(`${__dirname}`, '../excels/frequency.xlsx')
  console.log(filePath)
  const docs = xlsx.parse(filePath)[0].data
  try {
    for (let i = 2; i < docs.length; i++) {
      const obj = docs[i]
      if (obj[14] && obj[0] && obj[1]) {
        let doc = {
          code: obj[14].trim(),
          name: obj[0],
          pyCode: obj[1],
          created_at: new Date(),
          deleted_at: new Date()
        }
        console.log(i)
        Frequency.findOneAndUpdate({ code: doc.code }, doc, { upsert: true, rawResult: true, new: true })
      }
    }
  } catch (e) {
    return res.json({ err: e.message })
  }
  res.json({ ok: 1 })
})

router.all('/routeOfAdministration', async (req, res) => {
  let filePath = path.join(`${__dirname}`, '../excels/routeOfAdministration.xlsx')
  console.log(filePath)
  const docs = xlsx.parse(filePath)[0].data
  try {
    for (let i = 2; i < docs.length; i++) {
      const obj = docs[i]
      if (obj[5] && obj[9] && obj[8]) {
        let doc = {
          code: obj[5].trim(),
          name: obj[9],
          pyCode: obj[8],
          created_at: new Date(),
          deleted_at: new Date()
        }
        console.log(i)
        RouteOfAdministration.findOneAndUpdate({ code: doc.code }, doc, { upsert: true, rawResult: true, new: true })
      }
    }
  } catch (e) {
    return res.json({ err: e.message })
  }
  res.json({ ok: 1 })
})

router.all('/manu_factory', async (req, res) => {
  let filePath = path.join(`${__dirname}`, '../excels/manu_factory.xlsx')
  console.log(filePath)
  const docs = xlsx.parse(filePath)[0].data
  try {
    for (let i = 2; i < docs.length; i++) {
      const obj = docs[i]
      if (obj[0] && obj[1] && obj[6]) {
        let doc = {
          code: (obj[0] + '').trim(),
          name: obj[1],
          pyCode: obj[6],
          created_at: new Date(),
          deleted_at: new Date()
        }
        console.log(doc)
        await ManuFactory.findOneAndUpdate({ code: doc.code }, doc, { upsert: true, rawResult: true, new: true })
      }
    }
  } catch (e) {
    return res.json({ err: e.message })
  }
  res.json({ ok: 1 })
})

router.all('/drug', async (req, res) => {
  let filePath = path.join(`${__dirname}`, '../excels/drug.xlsx')
  console.log(filePath)
  const docs = xlsx.parse(filePath)[0].data
  try {
    for (let i = 2; i < docs.length; i++) {
      const obj = docs[i]
      let type
      if (obj[21] && (obj[24] + '').trim() && obj[21] !== 'NULL') {
        if ((obj[24] + '').trim() === '3') {
          type = 1
        } else {
          type = 0
        }
      } else {
        continue
      }
      let code
      if (obj[3] && (obj[3] + '').trim() && obj[3] !== 'NULL') {
        code = (obj[3] + '').trim()
      } else {
        continue
      }
      let name
      if (obj[1] && obj[1] !== 'NULL') {
        name = obj[1]
      } else {
        continue
      }
      let pyCode
      if (obj[3] && obj[3] !== 'NULL') {
        pyCode = obj[3]
      }
      let specification
      if (obj[16] && obj[16] !== 'NULL') {
        specification = obj[16]
      }
      let manuFactoryName
      if (obj[2] && (obj[2] + '').trim() && obj[2] !== 'NULL') {
        let code = (obj[2] + '').trim()
        let mf = await ManuFactory.findOne({ code })
        if (mf) manuFactoryName = mf.name
      }
      let doseFormName
      if (obj[7] && (obj[7] + '').trim() && obj[7] !== 'NULL') {
        let code = (obj[7] + '').trim()
        let df = await DoseForm.findOne({ code })
        if (df) doseFormName = df.name
      }
      let licenseNo
      if (obj[0] && (obj[0] + '').trim() && obj[0] !== 'NULL') {
        licenseNo = (obj[0] + '').trim()
      }
      let onceDose
      if (obj[24] && (obj[24] + '').trim() && obj[24] !== 'NULL') {
        onceDose = (obj[24] + '').trim()
      }
      let onceDoseUnitName
      if (obj[25] && (obj[25] + '').trim() && obj[25] !== 'NULL') {
        let code = (obj[25] + '').trim()
        let du = await DoseUnit.findOne({ code })
        if (du) onceDoseUnitName = du.name
      }
      let dosage
      if (obj[14] && obj[14] !== 'NULL') {
        dosage = obj[14]
      }
      let dosageUnitName
      if (obj[13] && (obj[13] + '').trim() && obj[13] !== 'NULL') {
        let code = (obj[13] + '').trim()
        let du = await DoseUnit.findOne({ code })
        if (du) dosageUnitName = du.name
      }
      let packingUnitName
      if (obj[15] && (obj[15] + '').trim() && obj[15] !== 'NULL') {
        let code = (obj[15] + '').trim()
        let du = await DoseUnit.findOne({ code })
        if (du) packingUnitName = du.name
      }
      let routeAdministrationName
      if (obj[22] && (obj[22] + '').trim() && obj[22] !== 'NULL') {
        let code = (obj[22] + '').trim()
        let roa = await RouteOfAdministration.findOne({ code })
        if (roa) routeAdministrationName = roa.name
      }
      let frequencyName
      if (obj[23] && (obj[23] + '').trim() && obj[23] !== 'NULL') {
        let code = (obj[23] + '').trim()
        let fq = await Frequency.findOne({ code })
        if (fq) frequencyName = fq.name
      }
      let drug = {
        type,
        code, // 编码
        name, // 名称
        pyCode, // 拼音码
        specification, // 规格
        manuFactoryName, // 生产厂商
        doseFormName, // 剂型
        licenseNo, // 国药准字、文号
        onceDose, // 单次剂量
        onceDoseUnitName, // 单次剂量单位
        dosage, // 剂量
        dosageUnitName, // 剂量单位
        packingUnitName, // 药品包装单位
        routeAdministrationName, // 用药途径id/默认用法
        frequencyName, // 用药频率/默认频次
        created_at: new Date(),
        deleted_at: new Date()
      }
      console.log(i)
      await Drug.findOneAndUpdate({ code }, drug, { upsert: true, rawResult: true, new: true })
    }
  } catch (e) {
    return res.json({ err: e.message })
  }
  res.json({ ok: 1 })
})

export default router
