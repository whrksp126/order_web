import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, InputNumber, message, Popconfirm, Select, Space, Table, Tag, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import axios from 'axios';
import InputSeletList from './InputSeletList';
import TrMenuComponent from './TrMenuComponent';

const AdminAllMenu = (props) => {


  const [propsData, setPropsData] = useState();
  const [showMenuData, setShowMenuData] = useState();
  const [tablePage, setTablePage] = useState();
  const [currentPageNumber, setCurrentPageNumber] = useState();

  const server_url = 'http://192.168.35.227:5000'
  let maxItemCount = 5;

  useEffect(()=> {
    if(props.menusLists !== null && props.menuList !== null){
      setPropsData({
        'menuData' : props.menusLists,
        'menuList' : props.menuList,
      })
      if(props.menusLists.length < maxItemCount){
        setShowMenuData(props.menusLists)
        setTablePage([1]);

      }else{
        let countData = [];
        props.menusLists.forEach((menu, index)=>{
          if(index < maxItemCount){
            countData.push(menu)
          }
        })
        setShowMenuData(countData);
        let addPageNumber = [];
        for(let i=0; i<props.menusLists.length / maxItemCount; i++){
          addPageNumber.push(i + 1);
        }
        setTablePage(addPageNumber);
      }
      setCurrentPageNumber(1);
    };
  },[props])

  if(propsData !== undefined) {
    console.log("propsData['menuData'],",propsData['menuData'])
    console.log("propsData['menuList'],",propsData['menuList'])
  }

  const changeTableNumber = (newPageNumber) => {
    if(0 >= newPageNumber || newPageNumber > tablePage.length){

    }else{
      let countData = [];
      propsData.menuData.forEach((menu, index)=>{
        if(index >= newPageNumber * maxItemCount - maxItemCount && index < newPageNumber * maxItemCount){
          countData.push(menu)
        }
      })
      setShowMenuData(countData);
      setCurrentPageNumber(newPageNumber)

    }
  }

  return (
    <>
      <h2>모든 메뉴</h2>
      <table style={{width: '100%'}}>
        <thead>
          <tr style={{textAlign: 'center'}}>
            <th>메뉴명</th>
            <th>가격</th>
            <th>이미지</th>
            <th>설명</th>
            <th>리스트</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {showMenuData !== undefined && 
            showMenuData.map((menu, index) => {  
              const menuKey = index;
              const menuData = menu;
              return (
                <TrMenuComponent 
                  menuKey={menuKey} 
                  menuData={menuData} 
                  propsData={propsData} 
                  server_url={server_url} 
                />
              )
            })
          }
        </tbody>
      </table>
      
      <div style={{justifyContent: 'center', display: 'flex'}}>
        <div>
          <button onClick={() => changeTableNumber(currentPageNumber - 1)}>left</button>
        </div>
        {tablePage !== undefined && tablePage.map((number, index) => (
          <button onClick={() => changeTableNumber(number)} key={index}>{number}</button>
        ))}
        <div>
          <button onClick={ () => changeTableNumber(currentPageNumber + 1)}>rigth</button>
        </div>
      </div>
    </>
  )
}

export default AdminAllMenu