const notifReducer = (state = { message: '', error: false }, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return { message: '', error: false }
    default:
      return state
  }
}

export const setNotification = (notification, timeout, error) => {
  return async dispatch => {
    await dispatch({ type: 'SET_NOTIFICATION', data: { message: notification, error: error }})
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, timeout*1000)
  }
}

export default notifReducer