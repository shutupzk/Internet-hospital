import Model, { Consultation } from '../model'
import result from './result'

export const createConsultation = async (req, res) => {
  try {
    const department = await Model.create(Consultation, { doc: { } })
    return result.success(res, department)
  } catch (e) {
    return result.failed(res, e.message)
  }
}
