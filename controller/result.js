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
    data: formatDate(parseData(data)),
    msg: '操作成功'
  })
}

function parseData (data) {
  if (!data) return data
  let json = JSON.parse(JSON.stringify(data))
  return json
}

function formatDate(data) {
  if (data instanceof Array && data.length) {
    for (let obj of data) {
      obj = formatDate(obj)
    }
  } else if (data instanceof Object && JSON.stringify(data) !== '{}') {
    for (let key in data) {
      data[key] = formatDate(data[key])
    }
  } else if (data && isNaN(data * 1) && !isNaN(Date.parse(data))) {
    // console.log(moment.i(data))
    if (data.length <= 10) {
      data = moment(Date.parse(data)).format('YYYY-MM-DD HH:mm:ss')
    }
  }
  return data
}

export default Result
