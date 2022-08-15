import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MainHeader from '../component/MainHeader';
import MainMenuList from '../component/MainMenuList';
import MainOrderList from '../component/MainOrderList';
import "./Main.css"

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
        <div className="main_base">
          <div className="main_container">
            <MainHeader />
            {/* <button onClick={logoutUser}>로그아웃</button> */}
            <div style={{display: 'flex', height: '88vh' }}>
              <div style={{background:"rgb(255 200 200)", height:'88vh', width:"65%"}}>
                <MainMenuList  />
                <div style={{background:"rgb(255 237 237)", height:"10vh"}}>
                  <button>주문취소</button>
                  <button>주문하기</button>
                </div>
              </div>
              <MainOrderList />
            </div>
            
          </div>
        </div>
      ) : (
        <div className="main_container">
          <h1>비회원 유저</h1>
          <Link to={"/login"}><button>로그인</button></Link>
          <Link to={"/registe"}><button>회원가입</button></Link>
        </div>
      )} 
    </div>
  )
}

export default Main