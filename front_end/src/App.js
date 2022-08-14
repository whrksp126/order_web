import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Link, useNavigate } from 'react-router-dom';

const App = () => {
  let navigate = useNavigate();

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
    is_auth();
  },[])

  const logoutUser = async() => {
    await axios.post("/logout");
    navigate('/login');
  }

  return (
    <div>
      <h1>메인화면에 접속하였습니다.</h1>
      {user !== null ? (
        <>
          <h2>권한이 있는 유저가 접속 하였습니다.</h2>
          <button onClick={logoutUser}>로그아웃</button>
        </>
      ) : (
        <>
          <h2>권한이 없습니다. 로그인 하세요.</h2>
          <Link to={"/login"}><button>로그인</button></Link>
          <Link to={"/registe"}><button>회원가입</button></Link>
        </>
      ) } 
    </div>

  )
}

export default App