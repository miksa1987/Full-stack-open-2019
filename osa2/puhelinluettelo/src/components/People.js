import React from 'react'
import { DESTROY } from '../service/CommService'

const Person = (props) => (
  <div><li>{props.name} {props.number}
  <button onClick={() => props.deleteNumber(props.id, props.name)}>poista</button></li></div>
)

const People = (props) => {
  const deleteNumber = (id, name) => {
    if(window.confirm(`Poistetaanko ${name} ?`)) {
      DESTROY(id)
      const newPeople = props.people.filter(person => person.id !== id)
      props.setpeople(newPeople)
    }
  }

  return ( <div>
    <h2>Numerot</h2><ul>
    {props.people.filter(person => person.name.toLowerCase().includes(props.filter)).map(person =>
      <Person key={person.id} name={person.name} number={person.number} id={person.id} deleteNumber={deleteNumber}/>)}
  </ul></div> )
}

export default People
