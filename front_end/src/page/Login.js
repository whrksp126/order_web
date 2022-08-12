import React from 'react'

const Login = () => {

  const login_Submit = () => {
    console.log()
  }

  return (    
  <>
    <form onSubmit={login_Submit()}>
      <label>
        아이디 :
        <input type="text" />
      </label>
      <label>
        비밀번호 : 
        <input type="password" />
      </label>
      <input type="submit" value="Login" />
    </form>
  </>
  )
}

export default Login