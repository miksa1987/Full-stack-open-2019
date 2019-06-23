import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import queries from '../util/queries'

const Books = (props) => {
  const result = useQuery(queries.ALL_BOOKS)
  const gresult = useQuery(queries.ALL_GENRES)
  const [genre, setGenre] = useState('ALL')

  if (!props.show) {
    return null
  }

  if(result.loading || gresult.loading) {
    return ( <div>Loading...</div> )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>

          {genre === 'ALL' ? result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>)
            : result.data.allBooks.filter(a =>
              a.genres.indexOf(genre) > -1).map(a => 
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
          )}
        </tbody>
      </table>
      <p>select genre</p>
      <button onClick={() => setGenre('ALL')} >all</button>
      {gresult.data.allGenres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
    </div>
  )
}

export default Books