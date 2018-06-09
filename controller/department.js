import Model, { Department } from '../model'

export const departmentCreate = async (req, res) => {
  const { deptName, deptCode, weight } = req.body
  await Model.save(Department, { doc: { deptCode, deptName, weight } })
  return res.json({ ok: 1 })
}

export const departments = async (req, res) => {
  const departmentList = await Model.findByOps(Department, {})
  res.json({ ok: 1, data: departmentList })
}
