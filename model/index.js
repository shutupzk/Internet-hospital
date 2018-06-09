export * from './user'
export * from './doctor'
export * from './department'
export * from './patient'
export * from './consultation'
export * from './patient_with_doctor'
export * from './chat'
export * from './chat_message'

class Model {
  async findByOpsWithPage(Model, { ops, limit, skip, sort }) {
    console.log('ops', ops)
    limit = limit || 10
    skip = skip || 0
    if (!sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = await Model.find(ops)
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }

  async findDoctorByOpsWithPage(Model, { ops, limit, skip, sort }) {
    limit = limit || 10
    skip = skip || 0
    if (!sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = await Model.find(ops)
      .populate('departmentId')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }

  async findConsultationByOpsWithPage(Model, { ops, limit, skip, sort }) {
    limit = limit || 10
    skip = skip || 0
    if (!sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = await Model.find(ops)
      .populate('patientId').populate('doctorId')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }
}

const model = new Model()

export default model
