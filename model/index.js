export * from './user'
export * from './doctor'
export * from './department'

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

  updateByOps(Model, { ops, sets }) {
    return Model.update(ops, sets)
  }

  findByOps(Model, { ops }) {
    return Model.find(ops)
  }
}

const model = new Model()

export default model
