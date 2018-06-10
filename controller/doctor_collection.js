import { DoctorCollection, Doctor, User } from '../model'
import result from './result'
import { formatArrayId } from '../util'

export const doctorCollectionCreate = async (req, res) => {
  const { doctorId, userId } = req.body
  if (!doctorId || !userId) return result.failed(res, '缺少参数')
  let doctor = await Doctor.findById(doctorId)
  if (!doctor) return result.failed(res, '未找到指定的医生')
  let user = await User.findById(userId)
  if (!user) return result.failed(res, '未找到指定的用户')

  let data = await DoctorCollection.create({ doctorId, userId })
  return result.success(res, data)
}

export const doctorCollectionDelete = async (req, res) => {
  const { id } = req.body
  if (!id) return result.failed(res, '缺少参数')
  let data = await DoctorCollection.deleteOne({ _id: id })
  return result.success(res, data)
}

export const doctorCollectionList = async (req, res) => {
  let { userId } = req.body
  let ops = {}
  if (userId) ops.userId = userId

  let data = await DoctorCollection.find(ops).populate('doctorId')
  data = formatArrayId(data, ['doctor'])
  return result.success(res, data)
}
