const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { PubSub } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const config = require('./util/config')

const pubsub = new PubSub()

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int!
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allGenres: [String]!
    allAuthors: [Author]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount:    async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount:  async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks:     async (root, args) => {
      if(!args.author && !args.genre) {
        const books = await Book.find({})
          .populate('author')
        return books
      }
      if(args.author) {
        const books = await Book.find({})
          .populate('author')
        const authorBooks = books.filter(b => b.author.name === args.author)
        return authorBooks
      }
      
      const books = await Book.find({}).populate('author')
      const filteredBooks = books.filter(b => b.genres.indexOf(args.genre) > -1)
      return filteredBooks
    },
    allGenres: async (root, args) => {
      const books = await Book.find({})
      let genres = []

      books.forEach(b => {
        b.genres.forEach(g => {
          if(genres.indexOf(g) < 0) {
            genres.push(g)
          }
        })
      })

      return genres
    },
    allAuthors:   async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: await Author.find({ name: root.name }) })
      return books.length
    },
    born: (root) => {
      if(!root.born) return 0
      return root.born
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => {
        return pubsub.asyncIterator(['BOOK_ADDED'])
      } 
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      console.log(`current user ${currentUser}`)

      if(!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      let newAuthor = await Author.findOne({ name: args.author })
      console.log(newAuthor)
      if( newAuthor === null ) {
        newAuthor = await new Author({ name: args.author })
        await newAuthor.save()
      } 

      const book = new Book({ ...args, author: newAuthor._id })
        .populate('author')

      await book.save()
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      
      return book
    },

    editAuthor: async (root, args, { currentUser }) => {
      console.log(`current user ${currentUser}`)

      if(!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      if(!args.name || !args.setBornTo) {
        throw new UserInputError('Name or setBornTo must be provided')
      }

      const author = await Author.findOne({ name: args.name })
      console.log(author)
      author.born = args.setBornTo
      await author.save()
      
      return author
    },

    createUser: async (root, args) => {
      if(!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      await user.save()

      return user
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      console.log(`user found ${user}`)

      if(!user || args.password !== 'secret') {
        throw new UserInputError('Invalid credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      console.log(userForToken)

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req ? req.headers.authorization : null
    console.log(authorization)
   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
     const decodedToken = await jwt.verify(authorization.substring(7), config.JWT_SECRET)
     
     const currentUser = await User.findById(decodedToken.id)

     return { currentUser }
   }
 }
})
mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGO_URI, {useNewUrlParser: true})
  .then(s => console.log('Connected to MongoDB'))
  .catch(e => console.log(e))

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})