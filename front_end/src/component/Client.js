import React from 'react'
import MainHeader from './MainHeader'
import MainMenuList from './MainMenuList'
import MainOrderList from './MainOrderList'

const Client = () => {
  return (
    <div>                
      <MainHeader />
      {/* <button onClick={logoutUser}>로그아웃</button> */}
      <div style={{display: 'flex', height: '88vh' }}>
        <div style={{background:"rgb(255 200 200)", height:'88vh', width:"65%"}}>
          <MainMenuList />
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