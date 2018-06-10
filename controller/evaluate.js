import Model, { EvaluateQuesion, Evaluate, EvaluateDetail, Consultation, Patient } from '../model'
import result from './result'
import moment from 'moment'
import { formatArrayId, formatObjId } from '../util'

export const evaluateCreate = async (req, res) => {
  let { anonymous = true, consultationId, doctorId, evaluateDetails } = req.body
  evaluateDetails = JSON.parse(evaluateDetails)
  if (!consultationId || !doctorId || !evaluateDetails) return result.failed(res, '-1', '缺少参数')
  let patientId, userId
  if (consultationId) {
    const consultation = await Consultation.findById(consultationId)
    if (!consultation) return result.failed(res, '-1', '订单不存在')
    if (consultation.evaluated) return result.failed(res, '-1', '订单已评价,不能重复评价')
    patientId = consultation.patientId
    let pateint = await Patient.findById(consultation.patientId)
    userId = pateint.userId
  }
  let score = 0
  let content = '好评'
  for (let { value, evaluateQuesionId } of evaluateDetails) {
    let { type } = await EvaluateQuesion.findById(evaluateQuesionId)
    if (type === '01') {
      score += value * 1
    }
    if (type === '02') {
      content = value
    }
  }
  const evaluateInput = { score, anonymous, consultationId, doctorId, patientId, userId, content }
  let evaluate = await Evaluate.create(evaluateInput)
  if (!evaluate || !evaluate._id) return result.failed(res, '-1', '评价失败')
  const evaluateId = evaluate._id

  try {
    for (let obj of evaluateDetails) {
      await EvaluateDetail.create(Object.assign({}, obj, { evaluateId }))
    }
  } catch (e) {
    await Evaluate.removeById(evaluateId)
    return result.failed(res, '-1', '评价失败')
  }

  await Consultation.updateOne({ _id: consultationId }, { evaluated: true })
  evaluate = formatObjId(evaluate)

  return result.success(res, evaluate)
}

export const evaluateList = async (req, res) => {
  const { doctorId, showAll = false, startDate, endDate, userId, isUserGet, skip, limit } = req.body
  try {
    let ops = {
      created_at: { $gt: 0 }
    }
    if (doctorId) ops.doctorId = doctorId
    if (!showAll) {
      ops.score = { $gt: 11 }
    }
    if (isUserGet) {
      if (userId) {
        ops['$or'] = [{ userId, isShield: true }, { isShield: { $ne: true } }]
      } else {
        ops.isShield = { $ne: true }
      }
    } else {
      let startTime = new Date(startDate || '0').getTime()
      let endTime = new Date(
        endDate
          ? moment(endDate)
              .add(1, 'days')
              .format('x') * 1
          : moment()
              .add(1, 'days')
              .format('YYYY-MM-DD')
      ).getTime()
      ops.created_at = { $gt: startTime, $lt: endTime }
    }
    const evaluateList = await Model.findEvaluateByOpsWithPage(Evaluate, { ops, limit, skip })
    evaluateList.items = formatArrayId(evaluateList.items, ['consultation'])
    for (let item of evaluateList.items) {
      item.consultation = formatObjId(item.consultation, ['patient'])
    }

    return result.success(res, evaluateList)
  } catch (e) {
    return result.failed(res, '-1', e.message)
  }
}
