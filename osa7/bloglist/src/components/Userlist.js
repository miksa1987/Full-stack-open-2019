import React from 'react'
import { connect } from 'react-redux'

const Userlist = (props) => {
  return ( <div>
    <h2>Users</h2>
    <table><tbody>
    <tr><td><strong>User</strong></td><td><strong>Blogs created</strong></td></tr>
    {props.allUsers.map(user => <tr key={user.id * user.id}><td key={user.id}>{user.name}</td>
      <td key={user.id + user.id}>{user.blogs.length > 0 ? user.blogs.length : 0}</td></tr>)}
    </tbody></table></div>)
}

const mapStateToProps = (state) => {
  return { allUsers: state.allUsers }
}

export default connect(mapStateToProps, null)(Userlist)