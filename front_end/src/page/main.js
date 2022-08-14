import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MenuItem from '../component/MenuItem'

const Main = () => {
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
      {user !== null ? (
        <>
          <h1>로그인한 유저</h1>
          <button onClick={logoutUser}>로그아웃</button>
          {/* <MenuItem/> */}
        </>
      ) : (
        <>
          <h1>비회원 유저</h1>
          <Link to={"/login"}><button>로그인</button></Link>
          <Link to={"/registe"}><button>회원가입</button></Link>
        </>
      )} 
    </div>
  )
}

export default Main