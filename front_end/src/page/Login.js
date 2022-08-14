import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"
const Login = () => {
  const [loginData, setLoginData] = useState({email : '', password:''});
  let navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    axios.post("/login", loginData)
      .then((res)=> {
        // 로그인 성공!!!
        // 메인 페이지로 이동
        navigate('/');
      })
      .catch((err) => {
        if(err.response.status === 401){
          console.log(err)
        }else{
          console.log(err)
        }
      })
  };

  return (
    <div className="login_page">
      <form className="form_box" onSubmit={loginSubmit}>
        <label>
          이메일
        </label>
        <input type="email" name="email" 
          value={loginData.email} onChange={handleChange} required
          placeholder="test@test.test"
        />
        <label>
          비밀번호
        </label>
        <input type="password" name='password' value={loginData.password} onChange={handleChange} required
          placeholder="testtest" autoComplete="on" />
        <button type="submit">로그인</button>
        <p>계정이 없으면 <Link to="/register">회원가입</Link>을 진행하세요.</p>
      </form>
    </div>
  );
};

export default Login;