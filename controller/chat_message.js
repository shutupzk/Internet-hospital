import { ChatMessage, Chat } from '../model'
import { formatChat } from './chat'

export const sendMessage = async (TencentIM, { chatId, consultationId, type, text, image, audio, direction, prescriptionId, examId, laboraId }) => {
  if (!chatId || !consultationId || !type || !direction) throw new Error('参数错误')
  if (!text && !image && !audio) throw new Error('发送内容不能为空')
  let chatOrigin = await Chat.findById(chatId).populate([
    { path: 'patientWithDoctorId', select: '_id', populate: [{ path: 'userId', select: 'openId' }, { path: 'doctorId', select: 'doctorSn' }] },
    { path: 'systemWithDoctorId', select: '_id', populate: [{ path: 'systemId', select: '_id code name' }, { path: 'userId', select: 'openId' }] },
    { path: 'systemWithDoctorId', select: '_id', populate: [{ path: 'systemId', select: '_id code name' }, { path: 'doctorId', select: 'doctorSn' }] }
  ])

  let chat = formatChat(chatOrigin)
  
  

  let chatMessage = await ChatMessage.create({ chatId, consultationId, type, text, image, audio, direction, prescriptionId, examId, laboraId })

  TencentIM.sendmsg({From_Account, })

}
