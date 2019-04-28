import React from 'react'

const Person = (props) => (
  <div><p>{props.name} {props.number}</p></div>
)

const People = (props) => (
  <div>
    <h2>Numerot</h2>
    {props.people.filter(person => person.name.toLowerCase().includes(props.filter)).map(person => 
      <Person key={person.id} name={person.name} number={person.number} />)}  
  </div>
)

export default People