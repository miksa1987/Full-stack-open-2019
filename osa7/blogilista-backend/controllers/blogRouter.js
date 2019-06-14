const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../util/config')
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('users', { username: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  try{
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if(!request.token || !decodedToken.id) {
      response.status(400).send({error: 'bad username or password'})
      return
    }

    const user = await User.findById(decodedToken.id)
    console.log(user)
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      comments: request.body.comments || [],
      user: user._id
    })
    if(!blog.likes) blog.likes = 0

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    console.log(exception)
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = await jwt.verify(request.token, config.SECRET)
    if(!request.token || !decodedToken.id) {
      response.status(400).send({error: 'bad username or password'})
      return
    }

    const blogToRemove = await Blog.findById(request.params.id)
    console.log(blogToRemove)
    console.log()
    
    if(blogToRemove.user.toString() === decodedToken.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(400).end()
    }
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