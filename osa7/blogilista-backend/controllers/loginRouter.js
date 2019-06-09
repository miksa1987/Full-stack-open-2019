const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../util/config')

loginRouter.post('/', async (request, response) => {
  const user = await User.findOne({ username: request.body.username })
  console.log(user)

  const passwordCorrect = user === null 
  ? false : await bcrypt.compare(request.body.password, user.pwhash)

  if(!(user && passwordCorrect)) {
    response.status(400).send({ error: 'username or password incorrect' })
    return
  }

  const userForToken = {
    username: user.name,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)
  console.log(token)

  response.status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter