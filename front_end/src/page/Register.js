import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

  const [SingUpData, setSingUpData] = useState(
    {
      SingUpEmail : '',
      SingUpId : '', 
      SingUpPassword:'',
      verifyLoginPassword: ''
    }
  )

  const handleChange = (e) => {
    setSingUpData({
      ...SingUpData,
      [e.target.name] : e.target.value
    })
  }
  const loginSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(SingUpData, null, 2))
  }

  return (  
    <>
      <form onSubmit={loginSubmit}>
        <label>
          이메일 :
          <input 
            type="email" 
            name="SingUpEmail" 
            value={SingUpData.SingUpEmail}
            onChange={handleChange}
          />
        </label>
        <label>
          아이디 :
          <input 
            type="text" 
            name="loginId" 
            value={SingUpData.loginId}
            onChange={handleChange}
          />
        </label>
        <label>
          비밀번호 : 
          <input 
            type="password"
            name='loginPassword'
            value={SingUpData.loginPassword}
            onChange={handleChange}
          />
        </label>
        <label>
          비밀번호 확인 : 
          <input 
            type="password"
            name='verifyLoginPassword'
            value={SingUpData.verifyLoginPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">로그인</button>
      </form>
      <p>이미 계정이 있으면 <Link to="/login">로그인</Link>을 진행하세요.</p>
    </>
  )
}

export default Register