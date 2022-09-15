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


// import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Col, Layout, Menu, Row } from 'antd';

const Admin = () => {
  
  const { Header, Footer, Sider, Content } = Layout;

  
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
    <div >
      <Layout style={{width:"100vw", height:"100vh"}}>
        <Sider
          theme='light'
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            // console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            // console.log(collapsed, type);
          }}
        >
          <Menu mode="inline" defaultSelectedKeys={['1']} >
            <Menu.Item key={0}>홈으로</Menu.Item>
            <Menu.Item key={1}>메뉴 추가</Menu.Item>
            <Menu.Item key={2}>메뉴 보기</Menu.Item>
            <Menu.Item key={3}>리스트 추가</Menu.Item>
            <Menu.Item key={4}>카테고리 추가</Menu.Item>
            <Menu.Item key={5}>카테고리 보기</Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "#FFFFFF" }} />
          <Content style={{margin: '24px 16px 0',}}> 
            <Row>
              <Col span={8}>
                <AdminAddMenu menuList={menuList} />
              </Col>
              <Col span={16}>
                <AdminAllMenu menusLists={menusLists} />
              </Col>
            </Row>
            {/* <AdminAddMenuList /> */}
            {/* <AdminAllMenuList menuList={menuList} menusLists={menusLists}changeSelectList={changeSelectList} changeMenuList={changeMenuList} /> */}
          </Content>
          <Footer style={{ textAlign: 'center', }}> Web RMS ©2022 Created by GH_STUDIO </Footer>
        </Layout>
      </Layout>
      

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