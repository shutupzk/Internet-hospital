export * from './user'
export * from './doctor'
export * from './department'
export * from './patient'

class Model {
  findOneById(Model, { id }) {
    return Model.findOne({ _id: id })
  }

  findOneByOps(Model, { ops }) {
    return Model.findOne(ops)
  }

  save(Model, { doc }) {
    let instance = new Model(doc)
    return instance.save()
  }

  create(Model, { doc }) {
    return Model.create(doc)
  }

  updateByOps(Model, { ops, sets }) {
    return Model.update(ops, sets)
  }

  findByOps(Model, { ops }) {
    return Model.find(ops)
  }

  async findByOpsWithPage(Model, { ops, limit, skip, sort }) {
    limit = limit || 10
    skip = skip || 0
    if (sort) sort = { created_at: -1 }
    let total = await Model.count(ops)
    let items = Model.find(ops)
      .sort(sort)
      .skip(skip)
      .limit(limit)
    return { items, page_info: { skip, limit, total } }
  }
}

const model = new Model()

export default model
