import React from 'react'
import { connect } from 'react-redux'

const errorStyle = {
  border: 'solid 3px #ff0000',
  background: '#ffcccc'
}

const notificationStyle = {
  border: 'solid 3px #00ff00',
  background: '#ccffcc'
}

const hidden = {
  display: 'none'
}

const Message = ( props ) => {
  if(props.message === '') {
    return ( <div style={hidden}></div> )
  }
  if(props.error) {
    return ( <div style={errorStyle}>
      <p>{props.message}</p>
    </div>)
  } else {
    return ( <div style={notificationStyle}>
      <p>{props.message}</p>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return { message: state.message.message, error: state.message.error }
}

export default connect(mapStateToProps, null)(Message)