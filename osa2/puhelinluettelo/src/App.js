import React, { useState } from 'react'

const App = () => {
  const [ people, setPeople] = useState([
    { id: 0, name: 'Arto Hellas' }
  ]) 

  const submitName = (event) => {
    event.preventDefault()

    if( people.map(person => person.name).indexOf(event.target.name.value) > -1) {
      window.alert(`${event.target.name.value} on jo luettelossa!`)
      return
    }

    const newName = { 
      id: people[people.length - 1].id + 1,
      name: event.target.name.value }
    
    const newPeople = people.concat(newName)
    setPeople(newPeople)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={submitName}>
        <div>
          nimi: <input name="name" />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {people.map(person => <p key={person.id}>{person.name}</p>)}
    </div>
  )

}

export default App