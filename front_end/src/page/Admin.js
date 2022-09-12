import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Main.css"
import 'antd/dist/antd.css';

import { ToastContainer, toast } from 'react-toastify';

import AdminAddMenu from '../component/AdminAddMenu';
import AdminAllMenu from '../component/AdminAllMenu';
import AdminAddMenuList from '../component/AdminAddMenuList';
import AdminAllMenuList from '../component/AdminAllMenuList';


const Admin = () => {

  const [menusLists, setMenusLists] = useState(null)
  const [menuList, setMenuList] = useState(null)
  const [menus, setMenus] = useState(null)


  const [changeMenuList, setChangeMenuList] = useState(null)
  let new_array = [];

  const changeSelectList = (list_id) => {
    if(menusLists !== null){
      menusLists.forEach((item) => {
        if(item.list_id === list_id){
          new_array.push(item)
        }
      })
      setChangeMenuList(new_array)
    }
  }


  const call_all = (e) => {
    axios.post("/admin/call_all")
      .then((res)=> {
        if(res.data.status === 200){
          setMenus(res.data.menu)
          setMenuList(res.data.menu_list)
          setMenusLists(res.data.menus_lists)

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
    call_all()
  },[])
  
  useEffect(()=> {
    if(menuList !== null){
      changeSelectList(menuList[0].id)
    }
  }, [menuList])

  return (
    <div>
      <div className="main_base">
        <div className="main_container">
          <h1>메뉴 관리</h1>
          <AdminAddMenu menuList={menuList} />
          <AdminAllMenu menus={menus} />
          <AdminAddMenuList />
          <AdminAllMenuList menuList={menuList} menusLists={menusLists}changeSelectList={changeSelectList} changeMenuList={changeMenuList} />
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