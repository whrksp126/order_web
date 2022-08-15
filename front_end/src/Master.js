import React from 'react'
import Login from './page/Login';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Main from './page/Main';

const Master = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Master;