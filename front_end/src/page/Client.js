import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainHeader from '../component/MainHeader'
import MainMenuList from '../component/MainMenuList'
import MainOrderList from '../component/MainOrderList'

const Client = () => {
  const [menu, setMenu] = useState();
  const [menuList, setMenuList] = useState();
  const [menusLists, setMenusLists] = useState();
  const call_all = (e) => {
    axios.post("/admin/call_all")
    .then((res)=> {
      if(res.data.status === 200){
        setMenu(res.data.menu);
        setMenuList(res.data.menu_list);
        setMenusLists(res.data.menus_lists);
      }
      if(res.data.status === 404)console.error(res.data.message);
    })
    .catch((err) => console.error(err))
  }

  useEffect(()=> {
    call_all();
  },[])

  return (
    <div>         
      <div>
        <h2>테이블 선택</h2>
        <p>테이블 번호를 선택하세요!</p>
      </div>
      <MainHeader />
      {/* <button onClick={logoutUser}>로그아웃</button> */}
      <div style={{display: 'flex', height: '88vh' }}>
        <div style={{background:"rgb(255 200 200)", height:'88vh', width:"65%"}}>
          <MainMenuList  menuList={menuList} menusLists={menusLists} />
          <div style={{background:"rgb(255 237 237)", height:"10vh"}}>
            <button>주문취소</button>
            <button>주문하기</button>
          </div>
        </div>
        <MainOrderList />
      </div>
    </div>
  )
}

export default Client