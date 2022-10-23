import React, { useEffect, useState } from 'react'
import './MainOrderList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDrop } from 'react-dnd';

import { io } from "socket.io-client";

let endPoint = "http://127.0.0.1:5000"
let socket = io.connect(`${endPoint}`)



const MainOrderList = () => {

  const [selectedItem, setSelectedItem] = useState([]);
  const [newItem, setNewItem] = useState();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // isOver 을 이용하여 선택 아이템을 드래그 하여 장바구니에 올라갔을 때를 설정할 수 있다.
    // style={{ backgroundColor: isOver ? 'red' : 'white' }}
    // 수락할 유형 - 문자열 또는 기호
    accept: 'BOX',
    // 수집할 소품
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop: (item, monitor) => {
      setNewItem ({
        id: item.id,
        name : item.name,
        price : item.price,
        url : item.url,
        count : 1,
      })
    }
  }))
  
  
  const socketTest = () => {
    console.log('selectedItem,,',selectedItem)
    socket.emit("message", selectedItem);
  }

  useEffect(()=> {
    if(selectedItem.length === 0 && newItem !== undefined){
      // 아무것도 장바구니에 없을 때
      return setSelectedItem([...selectedItem, newItem]);
    }else if(selectedItem.length !== 0){
      // 장바구니에 하나라도 있을 때
      for(let i=0;i<selectedItem.length;i++){
        if(selectedItem[i].name === newItem.name){
          selectedItem[i].count = selectedItem[i].count + 1;
          return setSelectedItem([...selectedItem])
        } 
      }
      // 선택 item이 장바구니에 없을 때(for문을 다 돌아도 같은게 나오지 않은 경우)
      return setSelectedItem([...selectedItem, newItem]);
    }
  },[newItem])

  // 장바구니 리스트의 총 가격 계산 시작
  let totallPrice = 0;
  selectedItem.map((item, index) => (
    totallPrice = totallPrice + (item.price * item.count)
  ))
  // 장바구니 리스트의 총 가격 계산 시작


  const plusItem = (item) => {
    for(let i=0;i<selectedItem.length;i++){
      if(selectedItem[i].name === item.name){
        selectedItem[i].count = selectedItem[i].count + 1;
        return setSelectedItem([...selectedItem])
      } 
    }
  }
  
  const minusItem = (item) => {
    for(let i=0;i<selectedItem.length;i++){
      if(selectedItem[i].name === item.name){
        if(selectedItem[i].count !== 1){
          selectedItem[i].count = selectedItem[i].count - 1;
          return setSelectedItem([...selectedItem]);
        }else{
          return setSelectedItem(selectedItem.filter(i => i.name !== item.name));
        }
      } 
    }
  }

  const deleteItem = (item) => {
    return setSelectedItem(selectedItem.filter(i => i.name !== item.name));
  }

  return (
    <div className="MainOrderList">

      <div ref={drop} style={{height: '20%', display:'flex', justifyContent: 'center', fontSize: '70px', color: 'white', textAlign: 'center', alignItems: 'center', border: '3px solid white', borderRadius: '20px', margin: '20px'}}>
        <div>
          <FontAwesomeIcon icon={faCartPlus} />
          <span style={{ display: 'block', fontWeight: '700', fontSize:'18px'}}>{canDrop ? '담 기' : '장바구니'}</span>
        </div>
      </div>
      <div style={{height: '60%', padding: '20px', background: '#eeeeee'}}>
        <div style={{height: '46vh'}}>
          <table style={{width: '100%', }}>
            <thead>
              <tr>
                <th>번호</th>
                <th>이미지</th>
                <th>상품명</th>
                <th>가격</th>
                <th></th>
                <th>수량</th>
                <th></th>
                <th>버튼</th>
              </tr>
            </thead>
            <tbody>
              {selectedItem.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <img src={item.url} alt={"foodIcon"} style={{height:'5vh'}} />
                </td>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}</td>
                <td>
                  <button onClick={()=> plusItem(item)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </td>
                <td>{item.count}</td>
                <td>
                  <button onClick={()=> minusItem(item)}>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </td>
                <td>
                  <button onClick={()=> deleteItem(item)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>)
              )}
            </tbody>
          </table>
        </div>
          {selectedItem.length > 0 && <div style={{float: 'right'}}>총 가격 : {totallPrice.toLocaleString()}</div>}
        
      </div>
      <div>
        <button onClick={(e) => socketTest(e) }>주문하기</button>
      </div>
    </div>
  )
}

export default MainOrderList