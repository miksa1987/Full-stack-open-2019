import React from 'react'

// Huom. tyylien kanssa mulla on yhtä paljon silmää kuin kurssin opettajalla. Ei pahalla.
const errorStyle = {
  border: '5px solid #ff0000',
  background: 'solid #ffaaaa',
  textColor: 'solid #ff0000'
}

const successStyle = {
  border: '5px solid #00cc00',
  backgroundColor: '#aaffaa',
  textColor: '#00cc00'
}

const Message = (props) => {
  if(props.error && props.message !== '') {
    return ( <div><h3 style={errorStyle}>{props.message}</h3></div> )
  }
  else if(!props.error && props.message !== '') {
    return ( <div><h3 style={successStyle}>{props.message}</h3></div> )
  }
  else { return null }
}

export default Message
