const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'NEW':
      console.log(action.data)
      return action.data
    case 'EMPTY':
      return ''
    default:
      return state
  }
}

const newMessage = (message) => {

  return { type: 'NEW', data: { message: message }}
}

const emptyMessage = () => {
  return { type: 'EMPTY' }
}

const setMessage = (message, timeout) => {
  return async dispatch => {
    await dispatch({ type: 'NEW', data: message })

    timeout = timeout * 1000
    setTimeout(() => {
      dispatch( {type: 'EMPTY'} )
    }, timeout)
  }
}

export default notificationReducer
export { newMessage, emptyMessage, setMessage }