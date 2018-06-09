export * from './user'

export default class Model {
  findOneById (Model, { id }) {
    return Model.findOne({ _id: id })
  }
  
  findOneByOps (Model, { ops }) {
    return Model.findOne(ops)
  }
  
  save (Model, { doc }) {
    let instance = new Model(doc)
    return instance.save()
  }
  
  updateByOps (Model, { ops, sets }) {
    return Model.update(ops, sets)
  }
}
