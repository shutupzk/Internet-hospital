import express from 'express'
import path from 'path'
import xlsx from 'node-xlsx'
import { DoseForm, DoseUnit, Frequency, RouteOfAdministration, Drug } from '../model'
const router = express.Router()

router.all('/doseform', async (req, res) => {
  let filePath = path.join(`${__dirname}`, '../excels/doseForm.xlsx')
  console.log(filePath)
  const doseForms = xlsx.parse(filePath)[0].data
  try {
    for (let i = 3; i < doseForms.length; i++) {
      const obj = doseForms[i]
      if (obj[4] && obj[2] && obj[0]) {
        let doc = {
          code: obj[4].trim(),
          name: obj[2],
          pyCode: obj[0]
        }
        console.log(i)
        DoseForm.create(doc)
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
    for (let i = 3; i < doseUnits.length; i++) {
      const obj = doseUnits[i]
      if (obj[4] && obj[2] && obj[0]) {
        let doc = {
          code: obj[4].trim(),
          name: obj[2],
          pyCode: obj[0]
        }
        console.log(i)
        DoseUnit.create(doc)
      }
    }
  } catch (e) {
    return res.json({ err: e.message })
  }
  res.json({ ok: 1 })
})

export default router
