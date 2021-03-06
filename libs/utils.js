import moment from 'moment'
export const createTradeNo = () => {
  let sec = Math.round(new Date().getTime() / 1000) - new Date('2017').getTime()
  let r1 = (Math.random() + '').substr(4, 2)
  let r2 = (Math.random() + '').substr(4, 3)
  let r3 = (Math.random() + '').substr(4, 3)
  let r4 = (Math.random() + '').substr(4, 3)
  let r = (('1' + r1 + r2 + r3 + r4) * 1).toString(36)
  return (sec.toString(36) + r).toUpperCase()
}

export const createTransactionNo = () => {
  let date = moment().format('YYYYMMDDHHmmss')
  let sss = moment().format('SSS')
  sss = secondsFormat(sss, 3)
  let r1 = (Math.random() + '').substr(4, 3)
  let r2 = (Math.random() + '').substr(4, 3)
  let r3 = (Math.random() + '').substr(4, 3)
  let r4 = (Math.random() + '').substr(4, 3)
  return date + sss + r1 + r2 + r3 + r4
}

function secondsFormat(str, length) {
  if (str.length >= length) {
    return str
  } else {
    for (; str.length < length;) {
      str = '0' + str
    }
    return str
  }
}
