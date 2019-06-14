require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET
const NODE_ENV = process.env.NODE_ENV

module.exports = {mongoUrl, PORT, SECRET, NODE_ENV}