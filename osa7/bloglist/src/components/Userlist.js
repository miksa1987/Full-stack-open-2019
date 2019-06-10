import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Userlist = (props) => {
  return ( <div>
    <h2>Users</h2>
    <Table celled>
      <Table.Header><Table.Row>
        <Table.HeaderCell>User</Table.HeaderCell>
        <Table.HeaderCell>Blogs created</Table.HeaderCell>  
      </Table.Row></Table.Header>
      <Table.Body>
        {props.allUsers.map(user => 
          <Table.Row key={user.id}>
            <Table.Cell key={user.id+1}><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
            <Table.Cell key={user.id+2}>{user.blogs.length > 0 ? user.blogs.length : 0}</Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table></div>)
}

const mapStateToProps = (state) => {
  return { allUsers: state.allUsers }
}

export default connect(mapStateToProps, null)(Userlist)