var Result = {}
/**
 * 请求成功，但是操作失败，json数据
 * @param code 错误码
 * @param msg 错误信息
 * @param res
 * @returns {*}
 */
Result.failed = function(res, msg, code) {
  return res.json({
    code: code || -1,
    data: null,
    msg: msg || '操作失败'
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
    code: 200,
    data: data,
    msg: '操作成功'
  })
}

export default Result
