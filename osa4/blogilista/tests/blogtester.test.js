const mongoose = require('mongoose')
const app = require('../app')
const helper = require('../util/list_helper.js')
const supertest = require('supertest')

const api = supertest(app)

const Blog = require('../models/Blog')

const blogs = [
  {
    title: 'Tämä on ensimmäinen blogi',
    author: 'Mika Laaksonen', 
    url: 'http://www.maoonparas.fi',
    likes: 999
  },
  {
    title: 'Tämä on toinen blogi',
    author: 'Jaska Jokunen',
    url: 'http://www.huhuhuhuu.com',
    likes: 9
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(blogs[0])
  await blogObject.save()

  blogObject = new Blog(blogs[1])
  await blogObject.save()
})

test('corect amount of JSON entries are returned', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs.length).toBe(2)
})

test('Blog object id field is actually id', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})