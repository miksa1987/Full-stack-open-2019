const Blog = require('../models/Blog')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  let favorite = {
    title: '',
    author: '',
    likes: 0
  }

  blogs.forEach(blog => {
    if(blog.likes > favorite.likes) {
      favorite.title = blog.title
      favorite.author = blog.author
      favorite.likes = blog.likes
    }
  })

  return favorite
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

module.exports = {
  dummy, totalLikes, favoriteBlog, blogsInDb
}