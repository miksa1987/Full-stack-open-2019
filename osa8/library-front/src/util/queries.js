import { gql } from 'apollo-boost'

const FAVEGENRE = gql`
{
  me {
    favoriteGenre
  }
}
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}`

const ALL_BOOKS = gql`
{
  allBooks {
    title
    author {
      name
    }
    genres
    published
  }
}`

const GENRE_BOOKS = gql`
query allBooks($genre: String!) {
  allBooks(genre: $genre) {
    title
    published
    author {
      name
    }
  }
}
`

const ALL_GENRES = gql`
{
  allGenres
}
`
export default { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, GENRE_BOOKS, FAVEGENRE }