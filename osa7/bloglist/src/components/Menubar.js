import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Menubar = (props) => {
  const padding = {
    paddingRight: 10
  }

  return ( 
    <div>
    <Link style={padding} to='/'>Blogs</Link>
    <Link style={padding} to='/users'>Users</Link>
    {props.user.name} logged in
    <button onClick={props.logout}>Log out</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {logout})(Menubar)