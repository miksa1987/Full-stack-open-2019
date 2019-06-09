import axios from 'axios'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  console.log(action.data)
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    case 'SETUSER':
      return action.data
    default:
      return state
  }
}
 
export const login = (username, password) => {
  return async dispatch => {
    const response = await axios.post('/api/login', {username, password})
      
    const user = {  name: response.data.name,
                    username: response.data.username,
                    token: response.data.token,
                    id: response.data.id}
    
    window.localStorage.setItem('user', JSON.stringify(user))

    dispatch({ type: 'LOGIN', data: user })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.clear()
    blogService.setToken('')
    dispatch({ type: 'LOGOUT' })
  }
}

export const setUser = (user) => {
  return dispatch => {
    dispatch({ type: 'SETUSER', data: user })
  }
}

export default userReducer