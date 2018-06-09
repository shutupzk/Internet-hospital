export * from './user'
export * from './doctor'
export * from './department'
export * from './patient'
export * from './consultation'
<<<<<<< HEAD
export * from './payment'
=======
export * from './patient_with_doctor'
export * from './system_with_doctor'
export * from './system_with_patient'
export * from './system_with_user'
export * from './chat'
export * from './system'
export * from './chat_message'
>>>>>>> 65616542577c177a3c453eaaae247c15a15be1c3

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
