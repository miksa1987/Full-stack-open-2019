import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'


const Loginform = ( { setUser, setMessage, setErrorOn, nullMessage } ) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    
    try {
      const response = await axios.post('/api/login', {username, password})
    
      setUser({ name: response.data.name,
                      username: response.data.username,
                      token: response.data.token,
                      id: response.data.id})
    } catch(error) {
      setMessage('Username or password incorrect')
      setErrorOn(true)
      nullMessage()
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

Loginform.propTypes = {
  setUser: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setErrorOn: PropTypes.func.isRequired,
  nullMessage: PropTypes.func.isRequired
}

export default Loginform