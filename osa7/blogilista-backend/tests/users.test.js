const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

test('user with too short name cannot be added', async () => {
  const badUser = { name: 'John Doe', password: 'thisisgood', username: 'jd'}
  const response = await api.post('/api/users').send(badUser)
  expect(response.status).toBe(400)
})

test('user with too short password cannot be added', async () => {
  const badUser = { name: 'John Doe', password: 'jd', username: 'johndoe'}
  const response = await api.post('/api/users').send(badUser)
  expect(response.status).toBe(400)
})

afterAll(() => {
  mongoose.connection.close()
})