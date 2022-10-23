import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

let endPoint = "http://127.0.0.1:5000"
let socket = io.connect(`${endPoint}`)

const Counter = () => {

  const [orderSheet, setOrderSheet] = useState([
  ]);

  useEffect(()=> {
    getMessages();
  },[orderSheet.length]);

  const getMessages = () => {
    socket.on("message", orderMenuList => {
      if(orderMenuList.length>0){
        setOrderSheet([...orderSheet, orderMenuList]);
      }
    });
  };
  
  console.log('orderSheet,',orderSheet)

  return (
    <div>
      {orderSheet.length > 0 &&
        orderSheet.map(orderList => {
          let orderItem  = '';
          if(orderList.length > 0){
            orderList.forEach((menu) => {
              orderItem += `id : ${menu.id}, count: ${menu.count}`;
            })

          }
          return (<div>{orderItem}</div>)
        })
      } 
    </div>
  );
}

export default Counter