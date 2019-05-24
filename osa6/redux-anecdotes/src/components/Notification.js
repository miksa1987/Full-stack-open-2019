import React from 'react';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const styleNone = {
    display: 'none'
  }
  if(props.store.getState().notification === '') {
    return ( <div style={styleNone} /> )
  }
  return (
    <div style={style}>
      {props.store.getState().notification}
    </div>
  )
}

export default Notification
