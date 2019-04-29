import axios from 'axios'

const dbURI = 'http://localhost:3001/people'

const getAll = () => {
  const response = axios.get(dbURI)
  return response
}

const create = (content) => {
  const response = axios.post(dbURI, content)
  return response
}

const DESTROY = (id) => axios.delete(`${dbURI}/${id}`)

export { getAll, create, DESTROY }
