import React from 'react'

const Login = (props) => {
  if (!props.show) {
    return null
  }

  
  const loginFunction = async (e) => {
    e.preventDefault()
    const user = e.target.username.value
    const pass = e.target.password.value
    console.log(`${user} ${pass}`)

    const result = await props.login({ variables: { username: user, password: pass } })
    console.log(result)
    const token = result.data.login.value
    props.setToken(`bearer ${token}`)
    window.localStorage.setItem('library-token', `bearer ${token}`)
    
    props.setPage('books')
  }

  return ( <div>
    <h3>Log in</h3>
    <form onSubmit={loginFunction}>
      username <input name='username' /><br/>
      password<input name='password' type='password' /><br/>
      <button type='submit'>log in</button>
    </form>
  </div> )
}

export default Login