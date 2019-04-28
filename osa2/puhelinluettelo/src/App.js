import React, { useState } from 'react'
import People from './components/People'
import { Searchform, Addform } from './components/Forms'

const App = () => {
  const [ people, setPeople] = useState([
    { id:0, name: 'Arto Hellas', number: '040-123456' },
    { id:1, name: 'Martti Tienari', number: '040-123456' },
    { id:2, name: 'Arto Järvinen', number: '040-123456' },
    { id:3, name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [filter, setFilter] = useState('')

  return (
    <div>
      
      <Searchform filter={setFilter} />
      <h2>Puhelinluettelo</h2>
      <Addform setPeople={setPeople} people={people} />
      <h2>Numerot</h2>
      <People people={people} filter={filter} />
    </div>
  )

}

export default App