const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'NEW':
      console.log(action.data)
      return action.data.message
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

export default notificationReducer
export { newMessage, emptyMessage }