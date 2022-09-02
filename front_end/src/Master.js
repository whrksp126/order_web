import React from 'react'
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Login from './page/Login';
import Main from './page/Main';
import Admin from './page/Admin';

const Master = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/admin' element={<Admin/>} />
          <Route path='/' element={<Main/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Master;