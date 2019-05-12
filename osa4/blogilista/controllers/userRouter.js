const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

userRouter.get('/', (request, response) => {
  User.find({}) 
    .then(result => response.json(result))
})

userRouter.post('/', async (request, response) => {
  try {
    const saltRounds = 10
    const pwhash = await bcrypt.hash(request.body.password, saltRounds)

    const newUser = new User({ name: request.body.name,
      pwhash,
      username: request.body.username })
    
      const savedUser = await newUser.save()
      response.json(savedUser)
  } catch(exception) {
    request.statusCode(400).end()
  }
})

module.exports = userRouter