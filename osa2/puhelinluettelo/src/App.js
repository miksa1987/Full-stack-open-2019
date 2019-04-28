import React, { useState } from 'react'

const App = () => {
  const [ people, setPeople] = useState([
    { id:0, name: 'Arto Hellas', number: '040-123456' },
    { id:1, name: 'Martti Tienari', number: '040-123456' },
    { id:2, name: 'Arto Järvinen', number: '040-123456' },
    { id:3, name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [filter, setFilter] = useState('')

  const submitName = (event) => {
    event.preventDefault()

    if( people.map(person => person.name).indexOf(event.target.name.value) > -1) {
      window.alert(`${event.target.name.value} on jo luettelossa!`)
      return
    }

    const newName = { 
      id: people[people.length - 1].id + 1,
      name: event.target.name.value,
      number: event.target.number.value }
    
    const newPeople = people.concat(newName)
    setPeople(newPeople)
  }

  const searchChange = (event) => setFilter(event.target.value)

  return (
    <div>
      rajaa näytettäviä <input name="search" onChange={searchChange} />
      <h2>Puhelinluettelo</h2>
      <form onSubmit={submitName}>
      <div>
          nimi: <input name="name" />
        </div>
        <div>
          numero: <input name="number" />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {people.filter(person => person.name.toLowerCase().includes(filter)).map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App