import React, { useState } from 'react'

const App = () => {
  const [ people, setPeople] = useState([
    { id: 0, name: 'Arto Hellas', number: '050-2121400' }
  ]) 

  const submitName = (event) => {
    event.preventDefault()

    if( people.map(person => person.name).indexOf(event.target.name.value) > -1) {
      window.alert(`${event.target.name.value} on jo luettelossa!`)
      return
    }

    const newName = { 
      id: people[people.length - 1].id + 1,
      name: event.target.name.value,
      number: event.targer.number.value }
    
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
          numero: <input name="number" />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {people.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App