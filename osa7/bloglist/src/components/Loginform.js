import React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Label } from 'semantic-ui-react'

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
      <Label>username </Label> <Input name='username' />
      <Label>password </Label> <Input name='password' />
      <Button type='submit'>Login</Button>
    </form>
  </div>)
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser, setNotification, login })(Loginform)