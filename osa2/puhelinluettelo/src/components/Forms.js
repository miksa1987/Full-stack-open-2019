import React from 'react'
import { create, update } from '../service/CommService'

const Searchform = (props) => {
  const searchChange = (event) => props.filter(event.target.value)
  return ( <div>rajaa näytettäviä <input name="search" onChange={searchChange} /></div>)
}

const Addform = (props) => {
  const submitName = (event) => {
    event.preventDefault()

    if( props.people.map(person => person.name).indexOf(event.target.name.value) > -1) {
      if(window.confirm(`${event.target.name.value} on jo luettelossa, päivitetäänkö numbero?`)) {
        const name = props.people.find(person => person.name === event.target.name.value)
        const updatedName = { ...name, number: event.target.number.value }
        console.log(updatedName)

        update(updatedName.id, updatedName)
          .then(response => {
            props.setPeople(props.people.map(person => person.id !== updatedName.id ? person : response.data))
          })
      }
      return
    }

    const newName = {
      name: event.target.name.value,
      number: event.target.number.value }

    create(newName)
      .then(response => console.log(response.data))

    const newPeople = props.people.concat(newName)
    props.setPeople(newPeople)
  }

  return (<div><form onSubmit={submitName}>
    <div>
        nimi: <input name="name" />
      </div>
      <div>
        numero: <input name="number" />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form></div>)
}

export { Searchform, Addform }
