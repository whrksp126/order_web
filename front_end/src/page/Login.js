import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();

  const [ user, setUser ] = useState(null);
  useEffect(() => {
    const is_auth = async () => {
      try{
        const resp = await axios.get("/@me");
        setUser(resp.data)
      }catch(err){
        console.log(err)
      }
    };
    is_auth()
  },[])
  useEffect(()=>{
    if(user!=null){
      navigate('/')
    }
  }, [user])

  const [loginData, setLoginData] = useState({email : '', password:''})
  const [SingUpData, setSingUpData] = useState({
    email : '',
    name : '', 
    password:'',
    checkPassword: ''
  });
  const [isLogin, setIsLogion] = useState(true);

  const loginhandleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    });
  };

  const registerhandleChange = (e) => {
    setSingUpData({
      ...SingUpData,
      [e.target.name] : e.target.value
    })
  }
  const loginSubmit = (e) => {
    e.preventDefault();
    axios.post("/login", loginData)
      .then((res)=> {
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
  const registerSubmit = (e) => {
    e.preventDefault();
    axios.post("/register", SingUpData)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {console.log(err.response.data.message);
      });
  }


  const imgUrl = "images/logo.png"

  return (
    <div className="login_page">
      <div className="login_box">
        <img src={imgUrl} alt={"logo"} />
        {isLogin ? (
          <form className="form_box" onSubmit={loginSubmit}>
            <label>이메일</label>
            <input type="email" name="email" 
              value={loginData.email} onChange={loginhandleChange} required
              placeholder="test@test.test"
            />
            <label>비밀번호</label>
            <input type="password" name='password' value={loginData.password} onChange={loginhandleChange} required
              placeholder="testtest" autoComplete="on" />
            <button type="submit">로그인</button>
          </form>
        ) : (
          <form className="form_box" onSubmit={registerSubmit}>
            <label>이메일</label>
            <input type="email" name="email" 
              value={SingUpData.email} onChange={registerhandleChange} required
              placeholder="test@test.test"
            />
            <label>이름</label>
            <input type="text" name="name" 
              value={SingUpData.name} onChange={registerhandleChange} required
              placeholder="test"
            />
            <label>비밀번호</label>
            <input type="password" name='password' value={SingUpData.password} onChange={registerhandleChange} required
              placeholder="testtest" autoComplete="on" />
            <label>비밀번호 확인</label>
            <input type="password" name='subPassword' value={SingUpData.subPassword} onChange={registerhandleChange} required
              placeholder="testtest" autoComplete="on" />
            <button type="submit">회원가입</button>
          </form>
        )}
        <p>계정이 없으면 <span className="a_tag" onClick={()=>setIsLogion(!isLogin)}>{isLogin ? '회원가입' : '로그인'}</span>을 진행하세요.</p>
      </div>
    </div>
  );
};

export default Login;