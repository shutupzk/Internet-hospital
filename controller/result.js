import moment from 'moment'
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
    data: formatDate(data),
    msg: '操作成功'
  })
}

function formatDate(data) {
  if (data instanceof Array) {
    console.log('iii')
    for (let obj of data) {
      formatDate(obj)
    }
  } else if (data instanceof Object) {
    for (let key in data) {
      if (data[key] instanceof Array || data[key] instanceof Object) {
        formatDate(data[key])
      } else {
        if (data[key] && isNaN(data[key]) && !isNaN(Date.parse(data[key]))) {
          data[key] = moment(data[key]).format('YYYY-MM-DD HH:mm:ss')
        }
      }
    }
  }
  return data
}

export default Result
