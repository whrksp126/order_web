import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Main.css"

import { ToastContainer, toast } from 'react-toastify';

const Admin = () => {
  const [menu, setMenu] = useState({
    name: '',
    price: '',
    img_url: '',
    description: ''
  })

  const menuhandleChange = (e) => {
    setMenu({
      ...menu,
      [e.target.name] : e.target.value
    });
  };

  const addMenu = (e) => {
    e.preventDefault();
    axios.post("/menu/add", menu)
      .then((res)=> {
        if(res.data.status === 200){
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
        if(res.data.status === 404){
          toast.error(res.data.message,{
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }
      })
      .catch((err) => {

      })
  };

  return (
    <div>
      <div className="main_base">
        <div className="main_container">
          <h1>메뉴</h1>
          <h2>메뉴 추가</h2>
          <form className="" onSubmit={addMenu}>
            <label>메뉴명</label>
            <input type="text" name="name"
              value={menu.name} onChange={menuhandleChange} required
              placeholder="짜장면"
            />
            <label>가격</label>
            <input type="number" name='price' value={menu.price} onChange={menuhandleChange} required
              placeholder="39900" />
            <label>이미지</label>
            <input type="file" name='img' value={menu.img_url} onChange={menuhandleChange} required
              placeholder="" />
            <label>설명</label>
            <input type="textarea" name='description' value={menu.description} onChange={menuhandleChange}
              placeholder="" />
            
            <button type="submit">로그인</button>
          </form>
          <h2>메뉴 리스트</h2>
          
        </div>
      </div>
    </div>
  )
}

export default Admin