export * from './user'
export * from './doctor'
export * from './department'
export * from './patient'
export * from './consultation'
export * from './payment'
export * from './patient_with_doctor'
export * from './system_with_doctor'
export * from './system_with_patient'
export * from './system_with_user'
export * from './chat'
export * from './system'
export * from './chat_message'
export * from './consultation_reason'
export * from './evaluate_quesion'
export * from './evaluate'
export * from './evaluate_detail'
export * from './quick_reply'
export * from './diagnosis_dictionary'
export * from './diagnosis'
export * from './doctor_collection'
export * from './dose_form'
export * from './dose_unit'
export * from './frequency'
export * from './route_of_administration'
export * from './drug'
export * from './examination_dictionary'
export * from './examination_organ_dictionary'
export * from './examination_type_doctionary'
export * from './exam'
export * from './exam_item'

class Model {
  async findByOpsWithPage(Model, { ops, limit, skip, sort }) {
    console.log(ops)
    limit = limit * 1 || 10
    skip = skip * 1 || 0
    if (!sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = await Model.find(ops)
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }

  async findDoctorByOpsWithPage(Model, { ops, limit, skip, sort }) {
    limit = limit * 1 || 10
    skip = skip * 1 || 0
    if (!sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = await Model.find(ops)
      .populate({ path: 'departmentId', select: '-created_at -updated_at -deleted_at' })
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }

  async findConsultationByOpsWithPage(Model, { ops, limit, skip, sort }) {
    limit = limit * 1 || 10
    skip = skip * 1 || 0
    if (!sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = await Model.find(ops)
      .populate('patientId')
      .populate('doctorId')
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }

  async findEvaluateByOpsWithPage(Model, { ops, limit, skip, sort }) {
    limit = limit * 1 || 10
    skip = skip * 1 || 0
    if (!sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = await Model.find(ops)
      .populate({
        path: 'consultationId',
        select: '_id -_id',
        populate: { path: 'patientId', select: 'name -_id' }
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }

  async findExamByOpsWithPage(Model, { ops, limit, skip, sort }) {
    limit = limit * 1 || 10
    skip = skip * 1 || 0
    if (!sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = await Model.find(ops)
      .populate({
        path: 'patientId',
        select: 'name -_id birthday sex'
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }
}

const model = new Model()

export default model
