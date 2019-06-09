require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET

module.exports = {mongoUrl, PORT, SECRET}