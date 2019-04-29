import React from 'react'

const Person = (props) => (
  <div><li>{props.name} {props.number}</li></div>
)

const People = (props) => (
  <div>
    <h2>Numerot</h2><ul>
    {props.people.filter(person => person.name.toLowerCase().includes(props.filter)).map(person =>
      <Person key={person.id} name={person.name} number={person.number} id={person.id}/>)}
  </ul></div>
)

export default People
