import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const Counter = () => {
  const [testArray, setTestArray] = useState([]);
  const [text, setText] = useState();

  const socket = io.connect('http://127.0.0.1:5000');

  useEffect(()=>{
    socket.on('connect', () => {
      socket.send('사용자가 연결되었습니다!')
    })
    socket.on('message', (msg) => {
      setTestArray([...testArray, msg])
      console.log('받은 메시지: ', msg)
    })
  })

  const testSubmit = () => {
    socket.send(text)

    setText('');
  }

  const textOnChange = (e) => {
    setText(e.target.value);
  }


  return <>

  <input type="text" value={text} id="myMessage" onChange={(e) => textOnChange(e)}/>
  <button onClick={() => testSubmit()}>전송</button>
  <h1>socket test</h1>
  {testArray.length !== 0 && 
    testArray.map((data, index) => (
      <div key={index}>{data}</div>
    ))
  }
  </>
}

export default Counter