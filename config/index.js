var fs = require('fs')
var path = require('path')
const PORT = '3000'
const DB = {
  mongoUrl: 'mongodb://47.93.206.157:27017/internet_hospital',
  user: 'internet_hospital',
  pass: 'internet_hospital'
}

const ImConfig = {
  usersig:
    'eJxlj11PgzAYhe-5FYRbjJRCZTXxCp1MxeyLGK5IpaV7MygMKvsw-ncdLpHEc-s8Jyfn0zBN01q-rK5ZntcfSmf62AjLvDUtZF39waYBnjGdeS3-B8WhgVZkrNCiHaBLCMEIjR3gQmko4GIwXoEa4Y5vs2Hjt*--lCkN6GSsgBxg-JCEs0UYJ*UpqFYp9n3nvixoDxvOHk9hKrd6f2jztA8cPVdvJciZjGlEEv9GPdmbZ3e-y7vl0abrQLyLmtkQ7ZKujpzF63Qay7vRpIZKXA7hCfER9twR7UXbQa0GASOXuNhD51jGl-ENbp9dqA__',
  identifier: 'admin',
  accountType: '28795',
  sdkappid: '1400099798',
  private_key_string: fs.readFileSync(path.join(__dirname, 'imkeys/private_key')).toString(),
  public_key_string: fs.readFileSync(path.join(__dirname, 'imkeys/public_key')).toString()
}

export { PORT, DB, ImConfig }
