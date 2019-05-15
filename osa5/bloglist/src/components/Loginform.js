import React from 'react'
import axios from 'axios'

const Loginform = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    console.log(`${username} ${password}`)

    const response = await axios.post('/api/login', {username, password})
    
    props.setuser({ name: response.data.name,
                    username: response.data.username,
                    token: response.data.token})
  }

  return ( <div>
    <form onSubmit={handleSubmit}>
      <p>username  <input name='username' /></p>
      <p>password  <input name='password' /></p>
      <button type='submit'>Login</button>
    </form>
  </div>)
}

export default Loginform