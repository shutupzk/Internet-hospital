var Result = {}
var code_msg = []

/**
 * 请求成功，但是操作失败，json数据
 * @param code 错误码
 * @param msg 错误信息
 * @param res
 * @returns {*}
 */
Result.failed = function(res, code, msg) {
  return res.json({
    code: code || -1,
    data: null,
    msg: code_msg[code] || msg || '操作失败'
  })
}

/**
 * 操作成功返回，json数据
 * @param data
 * @param res
 * @returns {*}
 */
Result.success = function(res, data) {
  return res.json({
    code: '200',
    data: data,
    msg: '操作成功'
  })
}

Result.REQ_METHOD_ERROR = '10001'
code_msg[Result.REQ_METHOD_ERROR] = '请求方式错误'
Result.USER_NOT_EXIST = '10002'
code_msg[Result.USER_NOT_EXIST] = '请重新登录' // '用户不存在';
Result.PARAMS_ERROR = '10003'
code_msg[Result.PARAMS_ERROR] = '参数错误'
Result.NO_DATAS = '10004'
code_msg[Result.NO_DATAS] = '没有数据'
Result.PATIENT_NOT_EXIST = '10005'
code_msg[Result.PATIENT_NOT_EXIST] = '出诊人不存在'
Result.DEPT_NOT_EXIST = '10006'
code_msg[Result.DEPT_NOT_EXIST] = '科室不存在'
Result.SCHEDULE_NOT_EXIST = '10007'
code_msg[Result.SCHEDULE_NOT_EXIST] = '挂号信息不存在'
Result.SCHEDULE_CAN_NOT_REGIST = '10008'
code_msg[Result.SCHEDULE_CAN_NOT_REGIST] = '预约已满,无法挂号'
Result.REGISTRATION_NOT_EXIT = '10009'
code_msg[Result.REGISTRATION_NOT_EXIT] = '预约不存在'
Result.NO_PERMISSION = '10010'
code_msg[Result.NO_PERMISSION] = '没有权限操作'

Result.USER_REGISTER_ERROR = '-10001'
code_msg[Result.USER_REGISTER_ERROR] = '未注册成功'
Result.ADD_PATIENT_ERROR = '-10002'
code_msg[Result.ADD_PATIENT_ERROR] = '添加就诊人失败'
Result.REGISTRATION_DUPLICATE = '-10003'
code_msg[Result.REGISTRATION_DUPLICATE] = '重复挂号'
Result.REGISTRATION_ERROR = '-20004'
code_msg[Result.REGISTRATION_ERROR] = '挂号未成功'
Result.REGISTRATION_CANCEL_ERROR = '-20005'
code_msg[Result.REGISTRATION_CANCEL_ERROR] = '取消预约失败'
Result.VERIFY_CODE_ERROR = '-20006'
code_msg[Result.VERIFY_CODE_ERROR] = '验证码错误'
Result.PASSWORD_ALERT_ERROR = '-20007'
code_msg[Result.PASSWORD_ALERT_ERROR] = '修改密码失败'

Result.USER_REGISTER_NAME_ERROR = '20001'
code_msg[Result.USER_REGISTER_NAME_ERROR] = '用户名为空'
Result.USER_REGISTER_PHONE_ERROR = '20002'
code_msg[Result.USER_REGISTER_PHONE_ERROR] = '手机号格式为空或者不正确'
Result.USER_REGISTER_PASSWORD_ERROR = '20003'
code_msg[Result.USER_REGISTER_PASSWORD_ERROR] = '密码为空'
Result.USER_REGISTER_IDCARD_ERROR = '20004'
code_msg[Result.USER_REGISTER_IDCARD_ERROR] = '身份证为空或者格式不正确'
Result.USER_REGISTER_IDCARD_DUPLICATE = '20005'
code_msg[Result.USER_REGISTER_IDCARD_DUPLICATE] = '身份证号码已经被注册'
Result.USER_REGISTER_PHONE_DUPLICATE = '20006'
code_msg[Result.USER_REGISTER_PHONE_DUPLICATE] = '手机号码已经被注册'

Result.USER_LOGIN_PASSWORD_ERROR = '20007'
code_msg[Result.USER_LOGIN_PASSWORD_ERROR] = '密码错误'

Result.HOSPITAL_NOT_EXIST = '20008'
code_msg[Result.HOSPITAL_NOT_EXIST] = '医院不存在'
Result.HOSPITAL_DEPT_NOT_EXIST = '20012'
code_msg[Result.HOSPITAL_DEPT_NOT_EXIST] = '该医院没有科室'
Result.VERIFY_CODE_OVERDUE = '20009'
code_msg[Result.VERIFY_CODE_OVERDUE] = '验证码已过期'
Result.VERIFY_CODE_USED = '20010'
code_msg[Result.VERIFY_CODE_USED] = '验证码已经使用过'

Result.USER_STATUS_0 = '200011'
code_msg[Result.USER_STATUS_0] = '该账户已被禁用，请联系管理员(医院信息)'

export default Result
