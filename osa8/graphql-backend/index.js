const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const config = require('./util/config')

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
    allAuthors: [Author]!
    me: User
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
    allAuthors:   async () => await Author.find({})
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

  Mutation: {
    addBook: async (root, args) => {
      let newAuthor = await Author.findOne({ name: args.author })
      console.log(newAuthor)
      if( newAuthor === null ) {
        newAuthor = await new Author({ name: args.author })
        await newAuthor.save()
      } 

      const book = new Book({ ...args, author: newAuthor._id })
        .populate('author')

      await book.save()
      await console.log(book)
      return book
    },

    editAuthor: async (root, args) => {
      if(!args.name || !args.setBornTo) {
        throw new UserInputError('Name or setBornTo must be provided')
      }

      const author = await Author.findOne({ name: args.name })
      console.log(author)
      author.born = args.setBornTo
      await author.save()
      
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
mongoose.set('useCreateIndex', true)
mongoose.connect(config.MONGO_URI, {useNewUrlParser: true})
  .then(s => console.log('Connected to MongoDB'))
  .catch(e => console.log(e))

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})