import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  let navigate = useNavigate();

  const [SingUpData, setSingUpData] = useState(
    {
      email : '',
      name : '', 
      password:'',
      checkPassword: ''
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
        </label>
        <input 
          type="email" 
          name="email" 
          value={SingUpData.email}
          onChange={handleChange}
        />
        <label>
          아이디 :
        </label>
        <input 
          type="text" 
          name="name" 
          value={SingUpData.name}
          onChange={handleChange}
        />
        <label>
          비밀번호 : 
        </label>
        <input 
          type="password"
          name='password'
          value={SingUpData.password}
          onChange={handleChange}
          autoComplete="on"
        />
        <label>
          비밀번호 확인 : 
        </label>
        <input 
          type="password"
          name='checkPassword'
          value={SingUpData.checkPassword}
          onChange={handleChange}
        />
        <button type="submit">로그인</button>
      </form>
      <p>이미 계정이 있으면 <Link to="/login">로그인</Link>을 진행하세요.</p>
    </>
  )
}

export default Register