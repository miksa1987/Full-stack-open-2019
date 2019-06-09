const userRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

userRouter.get('/', (request, response) => {
  User.find({}).populate('blogs', { __v: 0 }) 
  .then(users => response.json(users))
})

userRouter.post('/', async (request, response) => {
  try {
    if(request.body.password.length < 3) throw new ValidationError({error: 'password must be over 3 chars long'})
    const saltRounds = 10
    const pwhash = await bcrypt.hash(request.body.password, saltRounds)

    const newUser = new User({ name: request.body.name,
      pwhash,
      username: request.body.username })
    
      const savedUser = await newUser.save()
      response.json(savedUser)
  } catch(exception) {
    console.log(exception)
    response.status(400).send( {error: 'bad username or password'})
  }
})

module.exports = userRouter