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
    description: '',
    menu_list: ''
  })
  const [previewImg, setPreviewImg] = useState(null)

  const menuhandleChange = (e) => {
    if(e.target.name === 'img_url'){
      setMenu({
        ...menu,
        [e.target.name] : e.target.files[0].name
      })
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      new Promise((resolve) => {
        reader.onload = () => {
          setPreviewImg(reader.result)
          resolve();
        }
      });
    }else{
      setMenu({
        ...menu,
        [e.target.name] : e.target.value
      });
    }
  };

  const addMenu = (e) => {
    e.preventDefault();
    console.log(menu)
    axios.post("/menu/add", menu)
      .then((res)=> {
        console.log(res)
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
        console.log(err)
      })
  };

  const [list, setList] = useState({name: '',description: ''})
  
  const listhandleChange = (e) => {
    setList({
        ...list,
        [e.target.name] : e.target.value
      });
  };
  const addList = (e) => {
    e.preventDefault();
    axios.post("/menu/add_list", list)
      .then((res)=> {
        console.log(res)
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
        console.log(err)
      })
  };

  const [menuList, setMenuList] = useState(null)
  const readList = (e) => {
    axios.post("/menu/read_list")
      .then((res)=> {
        if(res.data.status === 200){
          setMenuList(res.data.data)
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
        console.log(err)
      })
  };

  useEffect(()=> {
    readList()
  },[])


  return (
    <div>
      <div className="main_base">
        <div className="main_container">
          <h1>메뉴 관리</h1>
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
            <input type="file" name='img_url' onChange={menuhandleChange} required
              placeholder="" />

            <label>설명</label>
            <input type="textarea" name='description' value={menu.description} onChange={menuhandleChange}
              placeholder=""/>
            {menuList && <><label>리스트</label>
            <select defaultValue='0' name="menu_list" onChange={menuhandleChange}>
                <option value="0">리스트를 선택하세요.</option>
              { menuList.map((list, index) => (
                <option key={index} value={list.id}>{list.name}</option>)
              )}
            </select></>}
            <button type="submit">메뉴 추가</button>
          </form>




          {previewImg && (
              <img
                alt={menu.img_url}
                src={previewImg}
                accept="image/*"
                style={{ margin: "auto" }}
              />
            )}
          <h2>리스트 추가</h2>
          <form onSubmit={addList}>
          <label>리스트명</label>
          <input type="text" name="name"
              value={list.name} onChange={listhandleChange} required
              placeholder="추천메뉴"
            />
            <label>설명</label>
            <input type="textarea" name="description"
                value={list.description} onChange={listhandleChange}
                placeholder=""
              />
            <button type="submit">리스트 추가</button>
          </form>
          
        </div>
      </div>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}/>
    </div>
  )
}

export default Admin