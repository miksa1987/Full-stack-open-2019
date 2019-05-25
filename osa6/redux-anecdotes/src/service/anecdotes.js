import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnecdote)
  console.log(response.data)
  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const update = async (id, content) => {
  const response = await axios.put(`${baseUrl}/${id}`, content)
  return response.data
}

export default { getAll, createNew, get, update }