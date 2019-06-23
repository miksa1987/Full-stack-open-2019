import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import queries from '../util/queries'

const Recommended = (props) => {
  const result = useQuery(queries.ALL_BOOKS)
  const gresult = useQuery(queries.FAVEGENRE)

  if (!props.show) {
    return null
  }

  if(result.loading || gresult.loading) {
    return null
  }

  return ( <div>
    <h3>Recommended books</h3>
    <table><tbody>
      {result.data.allBooks.filter(a =>
        a.genres.indexOf(gresult.data.me.favoriteGenre) > -1).map(a => 
          <tr key={a.title}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td></tr>)}
    </tbody></table>
  </div> )
}

export default Recommended