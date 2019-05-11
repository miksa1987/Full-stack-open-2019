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

test('Addition of blog object is succesful', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToBeAddded = {
    title: 'Tämä on kolmas blogi',
    author: 'Simba',
    url: 'http://www.iltalehti.fi',
    likes: 99
  }
  await api
    .post('/api/blogs')
    .send(blogToBeAddded)
    .expect(201)

  const response = await api.get('/api/blogs')
  const blogsAtEnd = response.body

  expect(blogsAtEnd.length).toBe((blogsAtStart.length) + 1)
})

test('If blog has no likes-field it will be set to 0', async () => {
  const blogWithNoLikes = new Blog({
    title: 'Tässä ei ole likes-kenttää',
    author: 'Stig',
    url: 'http://wikipedia.org'
  })
  await api
    .post('/api/blogs')
    .send(blogWithNoLikes)
    .expect(201)
  
  const response = await api.get('/api/blogs')
  
  expect(response.body[2].likes).toBe(0)
})

test('Blog with no title doesnt get added', async () => {
  const blogWithNoTitle = {
    author: 'Jekkumies',
    url: 'http://www.google.com',
    likes: 10
  }
  await api
    .post('/api/blogs')
    .send(blogWithNoTitle)
    .expect(400)
})

test('Blog with no url doesnt get added', async () => {
  const blogWithNoURL = {
    title: 'Jekkublogi',
    author: 'Jekkumies',
    likes: 10
  }
  await api
    .post('/api/blogs')
    .send(blogWithNoURL)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})