import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

let endPoint = "http://127.0.0.1:5000"
let socket = io.connect(`${endPoint}`)

const Counter = () => {

  const [messages, setMessages] = useState(["안녕하세요 그리고 환영합니다"]);
  const [message, setMessage] = useState('');

  useEffect(()=> {
    getMessages();
  },[messages.length]);

  const getMessages = () => {
    socket.on("message", msg => {
      setMessages([...messages, msg]);
    });
  };
  
  const onChange = e => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    if(message !== ""){
      socket.emit("message", message);
      setMessage("");
    }else{
      alert("메시지를 추가하십시오");
    };
  };

  return (
    <div>
      {messages.length > 0 &&
        messages.map(msg => (
          <div>
            <p>{msg}</p>
          </div>
        ))
      } 
      <input value={message} name="message" onChange={e => onChange(e)} />
      <button onClick={() => onClick()}>문자 보내기</button>
    </div>
  );
}

export default Counter