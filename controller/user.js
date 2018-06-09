import Model, { User } from '../model'

export const userSignup = async (req, res) => {
  const { openId, password } = req.body
  await Model.save(User, { doc: { openId, password } })
  return res.json({ ok: 1 })
}

export const userSignin = (req, res) => {
  res.json({ ok: 1 })
}
