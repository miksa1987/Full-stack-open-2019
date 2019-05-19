import React from 'react'
import PropTypes from 'prop-types'

const errorStyle = {
  border: 'solid 3px #ff0000',
  background: '#ffcccc'
}

const notificationStyle = {
  border: 'solid 3px #00ff00',
  background: '#ccffcc'
}

const Message = ( { message, errorOn } ) => {
  if(message === '') {
    return null
  }
  if(errorOn) {
    return ( <div style={errorStyle}>
      <p>{message}</p>
    </div>)
  } else {
    return ( <div style={notificationStyle}>
      <p>{message}</p>
    </div>)
  }
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  errorOn: PropTypes.bool.isRequired
}

export default Message