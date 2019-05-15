
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const createNew = (data) => {
  const config = { headers: { Authorization: token } }
  const request = axios.post(baseUrl, data, config)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, createNew, setToken }