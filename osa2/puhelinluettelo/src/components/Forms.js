import React, {useState} from 'react'
import { create, update } from '../service/CommService'
import Message from './Message'

const Searchform = (props) => {
  const searchChange = (event) => props.filter(event.target.value)
  return ( <div>rajaa näytettäviä <input name="search" onChange={searchChange} /></div>)
}

const Addform = (props) => {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

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
            setMessage(`${updatedName.name} numero päivitetty.`)
            setTimeout(() => { setMessage('') }, 2000)  })
          .catch(error => {
            setMessage(`${updatedName.name} ei voitu päivittää.`)
            setError(true)
            setTimeout(() => {
              setMessage('')
              setError(false) }, 2000)
          })
      }
      return
    }

    const newName = {
      name: event.target.name.value,
      number: event.target.number.value }

    create(newName)
      .then(response => {
        setMessage(`${newName.name} lisätty.`)
        setTimeout(() => { setMessage('') }, 2000)})
      .catch(error => {
        setMessage(`${newName.name} ei voitu lisätä.`)
        setError(true)
        setTimeout(() => {
          setMessage('')
          setError(false) }, 2000)
      })

    const newPeople = props.people.concat(newName)
    props.setPeople(newPeople)
  }

  return (<div>
    <Message error={error} message={message} />
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
    </form></div>)
}

export { Searchform, Addform }
