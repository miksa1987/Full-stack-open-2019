import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { login, setUser } from '../reducers/userReducer'

const Loginform = ( props ) => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    console.log('login function')
    props.login(username, password)
}

  return ( <div>
    <form onSubmit={handleSubmit}>
      <p>username  <input name='username' /></p>
      <p>password  <input name='password' /></p>
      <button type='submit'>Login</button>
    </form>
  </div>)
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser, setNotification, login })(Loginform)