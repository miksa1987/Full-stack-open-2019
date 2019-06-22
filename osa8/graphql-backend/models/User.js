const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    minlength: 3,
    unique: true
  },
  favoriteGenre: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('User', schema)