import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const styleNone = {
    display: 'none'
  }
  if(props.notification === '') {
    return ( <div style={styleNone} /> )
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}
export default connect(mapStateToProps)(Notification)
