import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const [loginData, setLoginData] = useState({loginId : '', loginPassword:''});
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
        if(err.response.status === 403){
          console.log(err.response.data.message)
        }else{
          console.log('오류발생',err)
        }
      })
    // console.log(JSON.stringify(loginData, null, 2));
  };

  return (    
  <>
    <form onSubmit={loginSubmit}>
      <label>
        아이디 :
        <input type="text" name="loginId" value={loginData.loginId} onChange={handleChange} />
      </label>
      <label>
        비밀번호 : 
        <input type="password" name='loginPassword' value={loginData.loginPassword} onChange={handleChange} />
      </label>
      <button type="submit">로그인</button>
    </form>
    <p>계정이 없으면 <Link to="/register">회원가입</Link>을 진행하세요.</p>
  </>
  );
};

export default Login;