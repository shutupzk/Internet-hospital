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
  } else if (data && isNaN(data) && !isNaN(Date.parse(data))) {
    data = moment(data).format('YYYY-MM-DD HH:mm:ss')
  }
  return data

  // if (data instanceof Array && data.length) {
  //   console.log('iii ===', JSON.stringify(data))
  //   for (let obj of data) {
  //     console.log(!(data instanceof Array || data instanceof Object))
  //     formatDate(obj)
  //   }
  // } else if (data instanceof Object) {
  //   for (let key in data) {
  //     if (data[key] instanceof Array || data[key] instanceof Object) {
  //       formatDate(data[key])
  //     } else {
  //       // console.log(key, data[key], data[key] instanceof Object)
  //       if (!JSON.stringify(data[key]) === '{}' && data[key] && isNaN(data[key]) && !isNaN(Date.parse(data[key]))) {
  //         console.log(' =====')
  //         data[key] = moment(data[key]).format('YYYY-MM-DD HH:mm:ss')
  //       }
  //     }
  //   }
  // }
}

export default Result
