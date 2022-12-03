import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

let endPoint = "http://127.0.0.1:5000"
let socket = io.connect(`${endPoint}`)

const Counter = () => {

  const [response, setResponse] = useState("");
  useEffect(()=>{
    // const socket = io.connect(endPoint)
    socket.on("FromAPI", data => {
      setResponse(data)
    })
  },[])

  // const [orderSheet, setOrderSheet] = useState([]);

  // useEffect(()=> {
  //   getMessages();
  // },[orderSheet.length]);

  // const getMessages = () => {
  //   socket.on("join", orderMenuList => {
  //     console.log(orderMenuList)
  //     if(orderMenuList.length>0){
  //       setOrderSheet([...orderSheet, orderMenuList]);
  //     }
  //   });
  // };

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
    // <div>
    //   {orderSheet.length > 0 &&
    //     orderSheet.map(orderList => {
    //       let orderItem  = '';
    //       if(orderList.length > 0){
    //         orderList.forEach((menu) => {
    //           orderItem += `id : ${menu.id}, count: ${menu.count}`;
    //         })

    //       }
    //       return (<div>{orderItem}</div>)
    //     })
    //   } 
    // </div>
  );
}

export default Counter