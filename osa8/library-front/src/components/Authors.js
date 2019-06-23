import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import queries from '../util/queries'
import mutations from '../util/mutations'

const Authors = (props) => {
  const result = useQuery(queries.ALL_AUTHORS)
  const editAuthor = useMutation(mutations.EDIT_AUTHOR,
    { refetchQueries: [{ query: queries.ALL_AUTHORS }]
  })

  const updateAuthor = (e) => {
    e.preventDefault()
    const name = e.target.author.value
    const setBornTo = Number(e.target.setBornTo.value)

    editAuthor({ variables: { name, setBornTo  }})
  }

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return ( <div>Loading...</div>)
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token === null ? null : <form onSubmit={updateAuthor}>
        <select name='author'>
          {result.loading ? null : result.data.allAuthors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>)}
        </select>
        Born <input name='setBornTo' />
        <button type='submit'>Update author</button>
      </form> }

    </div>
  )
}

export default Authors