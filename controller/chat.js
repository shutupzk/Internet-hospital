import { PatientWithDoctor, Patient, Doctor, Chat, SystemWithUser, System, User, SystemWithDoctor, SystemWithPatient } from '../model'
import result from './result'

const POPULATE = [
  { path: 'patientWithDoctorId', select: '_id', populate: [{ path: 'doctorId', populate: [{ path: 'departmentId' }] }, { path: 'patientId', select: '_id name' }, { path: 'userId' }] },
  { path: 'systemWithUserId', select: '_id', populate: [{ path: 'systemId', select: '_id code name' }] },
  { path: 'systemWithDoctorId', select: '_id', populate: [{ path: 'systemId', select: '_id code name' }] }
]

export const chatCreate = async (req, res) => {
  const { type, patientId, doctorId, userId, code } = req.body
  try {
    if (type === '01') {
      let chat = await chatPatientWithDoctorCreate({ patientId, doctorId })
      return result.success(res, chat)
    } else if (type === '02') {
      let chat = await chatSystemWithUserCreate({ userId, code })
      return result.success(res, chat)
    } else if (type === '03') {
      let chat = await chatSystemWithDoctorCreate({ doctorId, code })
      return result.success(res, chat)
    } else if (type === '04') {
      let chat = await chatSystemWithPatientCreate({ patientId, code })
      return result.success(res, chat)
    } else {
      return result.failed(res, 'type 类型不对')
    }
  } catch (e) {
    return result.failed(res, e.message)
  }
}

export const chatUserList = async (req, res) => {
  const { userId } = req.body
  if (!userId) return result.failed(res, '参数错误')
  try {
    let patientWithDoctorIds = []
    const patientWithDoctors = await PatientWithDoctor.find({ userId })
    for (let { _id } of patientWithDoctors) {
      patientWithDoctorIds.push(_id)
    }
    let systemWithUserIds = []
    const systemWithUsers = await SystemWithUser.find({ userId })
    for (let { _id } of systemWithUsers) {
      systemWithUserIds.push(_id)
    }
    let chats = await Chat.find({
      $or: [
        { patientWithDoctorId: { $in: patientWithDoctorIds } },
        {
          systemWithUserId: { $in: systemWithUserIds }
        }
      ]
    }).populate(POPULATE)
    result.success(res, formatChats(chats))
  } catch (e) {
    console.log(e)
    return result.failed(res, e.message)
  }
}

export const chatDoctorList = async (req, res) => {
  const { doctorId } = req.body
  if (!doctorId) return result.failed(res, '参数错误')
  try {
    let patientWithDoctorIds = []
    const patientWithDoctors = await PatientWithDoctor.find({ doctorId })
    for (let { _id } of patientWithDoctors) {
      patientWithDoctorIds.push(_id)
    }
    let systemWithDoctorIds = []
    const systemWithDoctors = await SystemWithDoctor.find({ doctorId })
    for (let { _id } of systemWithDoctors) {
      systemWithDoctorIds.push(_id)
    }
    let chats = await Chat.find({
      $or: [
        { patientWithDoctorId: { $in: patientWithDoctorIds } },
        {
          systemWithDoctorId: { $in: systemWithDoctorIds }
        }
      ]
    }).populate(POPULATE)
    result.success(res, formatChats(chats))
  } catch (e) {
    console.log(e)
    return result.failed(res, e.message)
  }
}

export const chatDetail = async (req, res) => {
  const { id } = req.body
  if (!id) return result.failed(res, '参数错误')
  try {
    let chat = await Chat.findById(id).populate(POPULATE)
    result.success(res, formatChat(chat))
  } catch (e) {
    console.log(e)
    return result.failed(res, e.message)
  }
}

export const chatPatientWithDoctorCreate = async ({ patientId, doctorId }) => {
  if (!patientId || !doctorId) throw new Error('参数错误')
  try {
    let created_at = new Date()
    let updated_at = new Date()
    const patient = await Patient.findById(patientId)
    if (!patient) throw new Error('就诊人不存在')
    const doctor = await Doctor.findById(doctorId)
    if (!doctor) throw new Error('医生不存在')
    const { userId } = patient
    const patientWithDoctor = (await PatientWithDoctor.findOneAndUpdate({ patientId, doctorId }, { userId, patientId, doctorId, created_at, updated_at }, { upsert: true, rawResult: true, new: true }))
      .value
    const patientWithDoctorId = patientWithDoctor._id
    const chat = (await Chat.findOneAndUpdate({ patientWithDoctorId }, { type: '01', patientWithDoctorId, status: true, created_at, updated_at }, { upsert: true, rawResult: true, new: true })).value
    return chat
  } catch (e) {
    console.log(e)
    return e
  }
}

export const chatSystemWithUserCreate = async ({ userId, code }) => {
  if (!userId || !code) throw new Error('参数错误')
  try {
    let created_at = new Date()
    let updated_at = new Date()
    const user = await User.findById(userId)
    if (!user) throw new Error('用户不存在')
    const system = await System.findOne({ code })
    if (!system) throw new Error('系统用户不存在')
    const systemId = system._id
    const systemWithUser = (await SystemWithUser.findOneAndUpdate({ userId, systemId }, { userId, systemId, created_at, updated_at }, { upsert: true, rawResult: true, new: true })).value
    const systemWithUserId = systemWithUser._id
    const chat = (await Chat.findOneAndUpdate({ systemWithUserId }, { type: '02', systemWithUserId, status: true, created_at, updated_at }, { upsert: true, rawResult: true, new: true })).value
    return chat
  } catch (e) {
    console.log(e)
    return e
  }
}

export const chatSystemWithDoctorCreate = async ({ doctorId, code }) => {
  if (!doctorId || !code) throw new Error('参数错误')
  try {
    let created_at = new Date()
    let updated_at = new Date()
    const doctor = await Doctor.findById(doctorId)
    if (!doctor) throw new Error('医生不存在')
    const system = await System.findOne({ code })
    if (!system) throw new Error('系统用户不存在')
    const systemId = system._id
    const systemWithDoctor = (await SystemWithDoctor.findOneAndUpdate({ doctorId, systemId }, { doctorId, systemId, created_at, updated_at }, { upsert: true, rawResult: true, new: true })).value
    const systemWithDoctorId = systemWithDoctor._id
    const chat = (await Chat.findOneAndUpdate({ systemWithDoctorId }, { type: '03', systemWithDoctorId, status: true, created_at, updated_at }, { upsert: true, rawResult: true, new: true })).value
    return chat
  } catch (e) {
    console.log(e)
    return e
  }
}

export const chatSystemWithPatientCreate = async ({ patientId, code }) => {
  if (!patientId || !code) throw new Error('参数错误')
  try {
    let created_at = new Date()
    let updated_at = new Date()
    const patient = await Patient.findById(patientId)
    if (!patient) throw new Error('就诊人不存在')
    const { userId } = patient
    const system = await System.findOne({ code })
    if (!system) throw new Error('系统用户不存在')
    const systemId = system._id
    const systemWithPatient = (await SystemWithPatient.findOneAndUpdate({ patientId, systemId }, { patientId, userId, systemId, created_at, updated_at }, { upsert: true, rawResult: true, new: true }))
      .value
    const systemWithPatientId = systemWithPatient._id
    const chat = (await Chat.findOneAndUpdate({ systemWithPatientId }, { type: '04', systemWithPatientId, status: true, created_at, updated_at }, { upsert: true, rawResult: true, new: true })).value
    return chat
  } catch (e) {
    console.log(e)
    return e
  }
}

export const formatChat = (chat, needAccount) => {
  let obj = chat._doc
  let { type, status, lastMsgContent = '', lastMsgTime = null } = obj
  let newObj = { id: obj._id, type, status, lastMsgContent, lastMsgTime }
  delete newObj._id

  let key = ''
  if (newObj.type === '01') key = 'patientWithDoctorId'
  if (newObj.type === '02') key = 'systemWithUserId'
  if (newObj.type === '03') key = 'systemWithDoctorId'

  if (obj[key].patientId) {
    let { _id, name } = obj[key].patientId
    newObj.patient = { patientId: _id, name }
  }
  if (obj[key].doctorId) {
    let { _id, doctorName, identifier, avatar, title, departmentId } = obj[key].doctorId
    let doctor = { doctorId: _id, doctorName, avatar, title }
    if (departmentId) {
      const { _id, deptName } = departmentId
      doctor.departmentId = _id
      doctor.deptName = deptName
    }
    newObj.doctor = doctor
    if (needAccount) {
      newObj.doctorAccount = identifier
    }
  }
  if (obj[key].userId) {
    let { _id, identifier, avatar, name } = obj[key].userId
    newObj.user = { userId: _id, avatar, name }
    if (needAccount) {
      newObj.userAccount = identifier
    }
  }
  if (obj[key].systemId) {
    let { _id, code, name, identifier } = obj[key].systemId
    newObj.system = { systemId: _id, code, name }
    if (needAccount) {
      newObj.systemAccount = identifier
    }
  }
  return newObj
}

export const formatChats = chats => {
  let array = []
  for (let chat of chats) {
    array.push(formatChat(chat))
  }
  return array
}
