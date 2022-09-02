import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"

import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const inputRef = useRef();

  // const [ user, setUser ] = useState(null);
  // useEffect(() => {
  //   inputRef.current.focus();
  //   const is_auth = async () => {
  //     try{
  //       const resp = await axios.get("/@me");
  //       setUser(resp.data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   };
  //   is_auth()
  // },[])
  // useEffect(()=>{
  //   if(user!=null){
  //     navigate('/')
  //   }
  // }, [user])

  const [loginData, setLoginData] = useState({email : '', password:''})
  const [SingUpData, setSingUpData] = useState({
    email : '',
    brand_name : '', 
    password:'',
    sub_password: ''
  });
  const [isLogin, setIsLogin] = useState(true);

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
  const signIn = (e) => {
    e.preventDefault();
    axios.post("/auth/signIn", loginData)
      .then((res)=> {
        if(res.data.status === 200){
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          navigate('/')
        }
        if(res.data.status === 404){
          toast.error(res.data.message,{
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }
      })
      
      .catch((err) => {
        if(err.response.status === 401){
          console.log(err)
        }else{
          console.log(err)
        }
      })
  };
  const signUp = (e) => {
    e.preventDefault();
    axios.post("/auth/signUp", SingUpData)
      .then((res) => {
        if(res.data.status === 200){
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          setIsLogin(!isLogin)
        }
        if(res.data.status === 404){
          toast.error(res.data.message,{
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }
        // navigate('/');
      }).catch((err) => {
        console.log(err);
      });
  }


  const imgUrl = "images/logo.png"

  return (
    <div className="login_page">
      <div className="login_box">
        <img src={imgUrl} alt={"logo"} />
        {isLogin ? (
          <form className="form_box" onSubmit={signIn}>
            <label>이메일</label>
            <input type="email" name="email" ref={inputRef}
              value={loginData.email} onChange={loginhandleChange} required
              placeholder="test@test.test"
            />
            <label>비밀번호</label>
            <input type="password" name='password' value={loginData.password} onChange={loginhandleChange} required
              placeholder="testtest" autoComplete="on" />
            <button type="submit">로그인</button>
          </form>
        ) : (
          <form className="form_box" onSubmit={signUp}>
            <label>이메일</label>
            <input type="email" name="email" 
              value={SingUpData.email} onChange={registerhandleChange} required
              placeholder="test@test.test"
            />
            <label>브랜드명</label>
            <input type="text" name="brand_name" 
              value={SingUpData.brand_name} onChange={registerhandleChange} required
              placeholder="test"
            />
            <label>비밀번호</label>
            <input type="password" name='password' value={SingUpData.password} onChange={registerhandleChange} required
              placeholder="testtest" autoComplete="on" />
            <label>비밀번호 확인</label>
            <input type="password" name='sub_password' value={SingUpData.sub_password} onChange={registerhandleChange} required
              placeholder="testtest" autoComplete="on" />
            <button type="submit">회원가입</button>
          </form>
        )}
        <p>계정이 없으면 <span className="a_tag" onClick={()=>setIsLogin(!isLogin)}>{isLogin ? '회원가입' : '로그인'}</span>을 진행하세요.</p>
      </div>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}/>
    </div>

  );
};

export default Login;