import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import Login from './page/Login';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './page/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
