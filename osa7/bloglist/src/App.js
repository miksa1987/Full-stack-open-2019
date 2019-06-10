import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { setNotification } from './reducers/notifReducer'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'

import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import Loginform from './components/Loginform'
import Newblogform from './components/Newblogform'
import Message from './components/Message'
import Togglabble from './components/Togglabble'
import Userlist from './components/Userlist'
import User from './components/User'
import Menubar from './components/Menubar'

const Main = (props) => {
  return (<div>
      <Togglabble buttonText='Add new blog' ref={props.blogFormRef}>
        <Newblogform BlogFormRef={props.blogFormRef} />
      </Togglabble>
      <br/><br/>
      <Bloglist blogFormRef={props.blogFormRef} />
  </div>)
}

const App = (props) => {
  const blogFormRef = React.createRef()

  const style = {
    width: '90%',
    margin: 'auto'
  }

  const userById = (id) => props.users.find(u => u.id === id)
  const blogById = (id) => props.blogs.find(b => b.id === id)
  
  if(props.user) {
    return (
      <div style={style}>
        <Message />
        <Router>
        <Menubar />
        <Route exact path='/' render={() => <Main user={props.user} logout={props.logout} blogFormRef={blogFormRef} blogs={props.blogs} /> }/>
        <Route exact path='/users' render={() => <Userlist />} />
        <Route exact path='/users/:id' render={({match}) => <User user={userById(match.params.id)} /> } />
        <Route exact path='/blogs/:id' render={({match}) => <Blog blog={blogById(match.params.id)} /> } />
        </Router>
      </div>
    )
  }

  return (
    <div style={style}>
      <Message />
      <h2>Log in to applicationn</h2>
      <Loginform />
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    message: state.message,
    blogs: state.blogs,
    user: state.user,
    users: state.allUsers
  }
}

const mapDispatchToProps = {
  initBlogs, setNotification, createBlog, setUser, logout
}
export default connect(mapStateToProps, mapDispatchToProps)(App)