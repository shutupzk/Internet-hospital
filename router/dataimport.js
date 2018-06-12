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
    for (let i = 3; i < docs.length; i++) {
      const obj = docs[i]
      let type
      if (obj[24] && (obj[24] + '').trim() && obj[24] !== 'NULL') {
        if ((obj[24] + '').trim() === '3') {
          type = 1
        } else {
          type = 0
        }
      } else {
        continue
      }
      let code
      if (obj[0] && (obj[0] + '').trim() && obj[0] !== 'NULL') {
        code = (obj[0] + '').trim()
      } else {
        continue
      }
      let name
      if (obj[5] && obj[5] !== 'NULL') {
        name = obj[5]
      } else {
        continue
      }
      let pyCode
      if (obj[1] && obj[1] !== 'NULL') {
        pyCode = obj[1]
      }
      let specification
      if (obj[15] && obj[15] !== 'NULL') {
        specification = obj[15]
      }
      let manuFactoryName
      if (obj[40] && (obj[40] + '').trim() && obj[40] !== 'NULL') {
        let code = (obj[40] + '').trim()
        let mf = await ManuFactory.findOne({ code })
        if (mf) manuFactoryName = mf.name
      }
      let doseFormName
      if (obj[6] && (obj[6] + '').trim() && obj[6] !== 'NULL') {
        let code = (obj[6] + '').trim()
        let df = await DoseForm.findOne({ code })
        if (df) doseFormName = df.name
      }
      let licenseNo
      if (obj[40] && (obj[40] + '').trim() && obj[40] !== 'NULL') {
        licenseNo = (obj[40] + '').trim()
      }
      let onceDose
      if (obj[33] && (obj[33] + '').trim() && obj[33] !== 'NULL') {
        onceDose = (obj[33] + '').trim()
      }
      let onceDoseUnitName
      if (obj[34] && (obj[34] + '').trim() && obj[34] !== 'NULL') {
        let code = (obj[34] + '').trim()
        let du = await DoseUnit.findOne({ code })
        if (du) onceDoseUnitName = du.name
      }
      let dosage
      if (obj[13] && obj[13] !== 'NULL') {
        dosage = obj[13]
      }
      let dosageUnitName
      if (obj[12] && (obj[12] + '').trim() && obj[12] !== 'NULL') {
        let code = (obj[12] + '').trim()
        let du = await DoseUnit.findOne({ code })
        if (du) dosageUnitName = du.name
      }
      let packingUnitName
      if (obj[14] && (obj[14] + '').trim() && obj[14] !== 'NULL') {
        let code = (obj[14] + '').trim()
        let du = await DoseUnit.findOne({ code })
        if (du) packingUnitName = du.name
      }
      let routeAdministrationName
      if (obj[31] && (obj[31] + '').trim() && obj[31] !== 'NULL') {
        let code = (obj[31] + '').trim()
        let roa = await RouteOfAdministration.findOne({ code })
        if (roa) routeAdministrationName = roa.name
      }
      let frequencyName
      if (obj[32] && (obj[32] + '').trim() && obj[32] !== 'NULL') {
        let code = (obj[32] + '').trim()
        let fq = await Frequency.findOne({ code })
        if (fq) frequencyName = fq.name
      }
      let retPrice
      if (obj[18] && obj[18] !== 'NULL') {
        retPrice = Math.ceil(obj[18] * 100)
      }
      let buyPrice
      if (obj[35] && obj[35] !== 'NULL') {
        buyPrice = Math.ceil(obj[35] * 100)
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
        retPrice,
        buyPrice,
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
