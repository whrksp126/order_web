import React from 'react'
import './MainOrderList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const MainOrderList = () => {
  return (
    <div className="MainOrderList">
      <div style={{height: '20%', display:'flex', justifyContent: 'center', fontSize: '70px', color: 'white', textAlign: 'center', alignItems: 'center', border: '3px solid white', borderRadius: '20px', margin: '20px'}}>
        <div style={{}}>
          <FontAwesomeIcon icon={faCartPlus} />
        </div>
      </div>
      <div style={{height: '60%', padding: '20px', background: '#eeeeee'}}>
        <table style={{width: '100%'}}>
          <thead>
            <tr>
              <th>번호</th>
              <th>이미지</th>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>버튼</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>이미지</td>
              <td>짜장면</td>
              <td>8500</td>
              <td>2</td>
              <td>
                + - 삭제
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div><button>주문하기</button></div>
    </div>
  )
}

export default MainOrderList