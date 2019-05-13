const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('users', {  })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.userid)
  console.log(user)
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user
  })
  console.log(blog)
  if(!blog.likes) blog.likes = 0

  try {
    const savedBlog = await blog.save()
    console.log('blog saved')
    user.blogs = user.blogs.concat(savedBlog._id)
    user.save()
    console.log('user saced')
    response.status(201).json(savedBlog)
  } catch(exception) {
    console.log(exception)
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(404).end()
  }  
})

blogRouter.put('/:id', async (request, response) => {
  try {
    const blog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0
    }
    const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    console.log(result)
    response.json(result)
  } catch (exception) {
    console.log(exception)
    response.status(400).end()
  }
})

module.exports = blogRouter