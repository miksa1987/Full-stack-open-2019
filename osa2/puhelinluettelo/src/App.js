import React, { useState, useEffect } from 'react'
import axios from 'axios'
import People from './components/People'
import { Searchform, Addform } from './components/Forms'

const App = () => {
  const [ people, setPeople] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/people')
      .then(response => setPeople(response.data))
  }, [])

  return (
    <div>
      
      <Searchform filter={setFilter} />
      <h2>Puhelinluettelo</h2>
      <Addform setPeople={setPeople} people={people} />
      <People people={people} filter={filter} />
    </div>
  )

}

export default App