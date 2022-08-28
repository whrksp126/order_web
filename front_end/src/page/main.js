import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Client from '../component/Client';
import Manager from '../component/Manager';
import "./Main.css"

const Main = () => {
  const [isClient, setIsClient] = useState(false);
  const [isManager, setIsManager] = useState(false);

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
            {!isClient && !isManager && (
            <div>
              <button onClick={()=>setIsClient(true)}>고객용</button>
              <button style={{ position : "absolute", top: "0", right: "0", background: "rgba(0, 0, 0, 0)", color: "rgba(0, 0, 0, 0)", border: "rgba(0, 0, 0, 0)",}} onClick={()=>setIsManager(true)}>관리자용</button>
            </div>
            )}
            {isClient && <Client />}
            {isManager && <Manager />}
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