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
  // useEffect(() => {
  //   const is_auth = async () => {
  //     try{
  //       const resp = await axios.get("/@me");
  //       setUser(resp.data)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   };
  //   is_auth();
  // },[])

  const logout = async() => {
    await axios.post("/auth/logout");
    // navigate('/login');
  }

  return (
    <div>
        <div className="main_base">
          <div className="main_container">

            <div className="main_table" >
              <div>
                <div>
                  <div>테이블</div>
                </div>
                <div style={{ background: "yellow", width: "15vw", height: "10vh", margin: "auto"}}>
                  <div>주방</div>
                </div>
                <div style={{ background: "yellow", width: "15vw", height: "10vh", margin: "auto"}}>
                  <div>계산대</div>
                </div>
              </div>

              <div>
                <div >
                  <div onClick={()=>{navigate("/admin")}}>영업관리</div>
                </div>
                <div >
                  <div>매출관리</div>
                </div>
                <div >
                  <div>환경설정</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_container">
          <h1>비회원 유저</h1>
          <Link to={"/login"}><button>로그인</button></Link>
          <Link to={"/registe"}><button>회원가입</button></Link>
          <button onClick={()=>logout()} >로그아웃</button>
        </div>
    </div>
  )
}

export default Main