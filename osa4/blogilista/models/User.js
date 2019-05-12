const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  pwhash: String,
  name: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.pwhash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
