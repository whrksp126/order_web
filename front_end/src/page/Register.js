import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  let navigate = useNavigate();

  const [SingUpData, setSingUpData] = useState(
    {
      SingUpEmail : '',
      SingUpId : '', 
      SingUpPassword:'',
      verifySingUpPassword: ''
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
    axios.post("/register", SingUpData)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {console.log(err.response.data.message);
      });
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
            name="SingUpId" 
            value={SingUpData.SingUpId}
            onChange={handleChange}
          />
        </label>
        <label>
          비밀번호 : 
          <input 
            type="password"
            name='SingUpPassword'
            value={SingUpData.SingUpPassword}
            onChange={handleChange}
          />
        </label>
        <label>
          비밀번호 확인 : 
          <input 
            type="password"
            name='verifySingUpPassword'
            value={SingUpData.verifySingUpPassword}
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