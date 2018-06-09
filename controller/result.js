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
    code: Object.keys(code)[0] || -1,
    data: null,
    msg: code_msg[Object.keys(code)[0]] || msg || '操作失败'
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

Result.REQ_METHOD_ERROR = { '10001': '请求方式错误' }

export default Result
