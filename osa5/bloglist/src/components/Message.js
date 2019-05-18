import React from 'react'

const errorStyle = {
  border: 'solid 3px #ff0000',
  background: '#ffcccc'
}

const notificationStyle = {
  border: 'solid 3px #00ff00',
  background: '#ccffcc'
}

const Message = (props) => {
  if(props.message === '') {
    return null
  }
  if(props.errorOn) {
    return ( <div style={errorStyle}>
      <p>{props.message}</p>
    </div>)
  } else {
    return ( <div style={notificationStyle}>
      <p>{props.message}</p>
    </div>)
  }
}

export default Message