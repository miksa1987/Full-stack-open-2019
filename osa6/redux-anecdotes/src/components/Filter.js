import React from 'react'
import { newFilter, emptyFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.store.dispatch(newFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
      <button onClick={() => props.store.dispatch(emptyFilter())}>Empty filter</button>
    </div>
  )
}

export default Filter