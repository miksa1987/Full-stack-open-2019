const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number,
  comments: [ String ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog