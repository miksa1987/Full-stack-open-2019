const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
  
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if(!blog.likes) blog.likes = 0

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
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