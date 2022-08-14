import React from 'react'
import Login from './page/Login';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Main from './page/Main';

const Master = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Master;