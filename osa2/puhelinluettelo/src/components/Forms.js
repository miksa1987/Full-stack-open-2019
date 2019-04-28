import React from 'react'

const Searchform = (props) => {
  const searchChange = (event) => props.filter(event.target.value)
  return ( <div>rajaa näytettäviä <input name="search" onChange={searchChange} /></div>)
}

const Addform = (props) => {
  const submitName = (event) => {
    event.preventDefault()
    
    if( props.people.map(person => person.name).indexOf(event.target.name.value) > -1) {
      window.alert(`${event.target.name.value} on jo luettelossa!`)
      return
    }
    
    const newName = { 
      id: props.people[props.people.length - 1].id + 1,
      name: event.target.name.value,
      number: event.target.number.value }
        
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