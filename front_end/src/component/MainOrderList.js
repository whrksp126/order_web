import React, { useEffect, useState } from 'react'
import './MainOrderList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useDrop } from 'react-dnd';

const MainOrderList = () => {
  const [selectedItem, setSelectedItem] = useState([]);
  const [newItem, setNewItem] = useState();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    //수락할 유형 - 문자열 또는 기호
    accept: 'BOX',
    // 수집할 소품
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: (item, monitor) => {
      setNewItem ({
        name : item.name,
        price : item.price,
        url : item.url,
        count : 1,
      })
    }
  }))

  useEffect(()=> {
    if(selectedItem.length === 0 && newItem !== undefined){
      // 아무것도 장바구니에 없을 때
      return setSelectedItem([...selectedItem, newItem]);
    }else if(selectedItem.length !== 0){
      // 장바구니에 하나라도 있을 때
      for(let i=0;i<selectedItem.length;i++){
        console.log('i,',i)
        if(selectedItem[i].name === newItem.name){
          console.log('1번 실행됨')
          selectedItem[i].count = selectedItem[i].count+1;
          return setSelectedItem([...selectedItem])
        } 
      }
      return setSelectedItem([...selectedItem, newItem]);
    }
  },[newItem])

  return (
    <div className="MainOrderList">

      <div style={{height: '20%', display:'flex', justifyContent: 'center', fontSize: '70px', color: 'white', textAlign: 'center', alignItems: 'center', border: '3px solid white', borderRadius: '20px', margin: '20px'}}>
        <div ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white' }}>
          <FontAwesomeIcon icon={faCartPlus} />
          <span style={{ display: 'block', fontWeight: '700', fontSize:'18px'}}>{canDrop ? '담 기' : '장바구니'}</span>
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
            {selectedItem.map((item, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.url}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.count}</td>
              <td>
                + - 삭제
              </td>
            </tr>)
            )}
          </tbody>
        </table>
      </div>
      <div><button>주문하기</button></div>
    </div>
  )
}

export default MainOrderList