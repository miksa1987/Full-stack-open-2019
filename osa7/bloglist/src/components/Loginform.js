import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'

const Loginform = ( props ) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    
    try {
      const response = await axios.post('/api/login', {username, password})
      
      const user = {  name: response.data.name,
                      username: response.data.username,
                      token: response.data.token,
                      id: response.data.id}

      props.setUser(user)
      props.setNotification(`${user.name} logged succesfully!`, 5)
    } catch(error) {
      props.setNotification('Username or password incorrect', 5, true)
  }
}

  return ( <div>
    <form onSubmit={handleSubmit}>
      <p>username  <input name='username' /></p>
      <p>password  <input name='password' /></p>
      <button type='submit'>Login</button>
    </form>
  </div>)
}

export default connect(null, { setNotification })(Loginform)