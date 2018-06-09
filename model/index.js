export * from './user'
export * from './doctor'
export * from './department'
export * from './patient'
export * from './consultation'
export * from './patient_with_doctor'
export * from './system_with_doctor'
export * from './system_with_patient'
export * from './system_with_user'
export * from './chat'
export * from './system'

class Model {
  async findByOpsWithPage(Model, { ops, limit, skip, sort }) {
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
}

const model = new Model()

export default model
