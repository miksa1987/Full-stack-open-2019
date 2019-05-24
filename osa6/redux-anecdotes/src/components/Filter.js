import React from 'react'
import { connect } from 'react-redux'
import { newFilter, emptyFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.newFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
      <button onClick={() => props.emptyFilter()}>Empty filter</button>
    </div>
  )
}

const mapDispatchToProps = {
  newFilter, emptyFilter
}

export default connect(null, mapDispatchToProps)(Filter)