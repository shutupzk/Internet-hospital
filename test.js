// import { API_SERVER } from '../config'
import rp from 'request-promise'

export const request = async json => {
  let option = {
    url: 'http://localhost:3000/dictionary/west/prescription/model/create',
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    form: json
  }
  const data = await rp(option)
  console.log('data ========== ', data)
  const result = data.data
  return result
}

request({
  name: '治心痛',
  type: '0',
  doctorId: '5b1cc699cbd16bf9d96ae31b',
  items: [
    {
      drugId: '5b1fe757d6c651987b0e64a7',
      onceDose: 1,
      onceDoseUnitName: '片',
      routeAdministrationName: '口服<饭前>',
      frequencyName: '1次/日(7pm)',
      illustration: '无',
      amount: 6
    },
    {
      drugId: '5b1fe757d6c651987b0e64c6',
      onceDose: 1,
      onceDoseUnitName: '片',
      routeAdministrationName: '口服<饭前>',
      frequencyName: '1次/日(7pm)',
      illustration: '无',
      amount: 6
    }
  ]
})
