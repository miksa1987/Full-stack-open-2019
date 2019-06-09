
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const createNew = (data) => {
  console.log(token)
  const config = { headers: { Authorization: token } }
  const request = axios.post(baseUrl, data, config)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, data) => {
  const config = { headers: { Authorization: token } }
  const request = axios.put(`${baseUrl}/${id}`, data, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = { headers: { Authorization: token } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}
export default { getAll, createNew, setToken, update, remove }