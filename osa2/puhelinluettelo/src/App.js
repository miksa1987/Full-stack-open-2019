import React, { useState, useEffect } from 'react'
import People from './components/People'
import { Searchform, Addform } from './components/Forms'
import { getAll } from './service/CommService'

const App = () => {
  const [ people, setPeople] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAll()
      .then(response => setPeople(response.data))
  }, [])

  return (
    <div>
      <Searchform filter={setFilter} />
      <h2>Puhelinluettelo</h2>
      <Addform setPeople={setPeople} people={people} />
      <People setpeople={setPeople} people={people} filter={filter} />
    </div>
  )

}

export default App
