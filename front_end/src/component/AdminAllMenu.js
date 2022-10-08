import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Input, InputNumber, message, Popconfirm, Select, Space, Table, Tag, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import axios from 'axios';

const AdminAllMenu = (props) => {
  const [propsData, setPropsData] = useState();
  const [showMenuData, setShowMenuData] = useState();
  const [tablePage, setTablePage] = useState();
  const [currentPageNumber, setCurrentPageNumber] = useState();

  const server_url = 'http://192.168.35.227:5000'
  let maxItemCount = 3;

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

  const editMenu = (index, menu) => {
    console.log(menu, index)
    // inputElement
    const inputName = `<input type="text" name="name" value="${menu.name}" />`
    const inputPrice = `<input type="Number" name="price" value="${menu.price}" />`
    const inputDescription = `<input type="text" name="description" value="${menu.description}" />`
    // const inputImg = `<input type="image" name="img_url" src="${server_url}/uploads/${menu.img_url}" />`
    const inputImg = `<img src="${server_url + '/uploads/' + menu.img_url}" alt=${menu.img_url} style="width: 70px" /><input type="file" name="img_url" />`
    const inputfunctionButton = `<button>저장</button><button>취소</button>`
    // targetElement
    const item_name = document.getElementById('tbody_tr_td_name:' + index)
    const item_price = document.getElementById('tbody_tr_td_price:' + index)
    const item_image = document.getElementById('tbody_tr_td_image:' + index)
    const item_description = document.getElementById('tbody_tr_td_description:' + index)
    const item_menuList = document.getElementById('tbody_tr_td_menuList:' + index)
    const imem_function = document.getElementById('tbody_tr_td_function:' + index)

    // innerHTML
    item_name.innerHTML = inputName;
    item_price.innerHTML = inputPrice;
    item_image.innerHTML = inputImg;
    item_description.innerHTML = inputDescription;
    imem_function.innerHTML = inputfunctionButton;
  }
  const deleteMenu = (index, menu) => {
    console.log(menu, index)
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
          {showMenuData !== undefined && showMenuData.map((menu, index) => (
          <tr key={index} id={'tbody_tr:'+index} >
            <td id={'tbody_tr_td_name:' + index}>{menu.name}</td>
            <td id={'tbody_tr_td_price:' + index} style={{float: 'right'}}>{menu.price.toLocaleString()} 원</td>
            <td id={'tbody_tr_td_image:' + index}>
              <img src={server_url + '/uploads/' + menu.img_url} alt={menu.img_url} style={{width: '70px'}} />  
            </td>
            <td id={'tbody_tr_td_description:' + index}>{menu.description}</td>
            <td id={'tbody_tr_td_menuList:' + index}>
              {/* <div style={{display: 'flex', justifyContent: 'start', gap: '10px'}}>
                {menu.menu_list.length !== 0 && (
                  menu.menu_list.map((list, index) => (
                    <div key={index} id={'list_id_'+list.list_id} style={{background : list.list_color, padding : '5px',borderRadius: '10px'}} >{list.list_name}</div>
                  ))
                )}
              </div> */}
              <div>
                <div style={{display: 'flex',}}>
                  {menu.menu_list.length !== 0 && (
                    menu.menu_list.map((list, index) => (
                      <div key={index} id={'list_id_'+list.list_id} style={{background : list.list_color, padding : '5px',borderRadius: '10px'}} >{list.list_name}</div>
                    ))
                  )}
                  <div>▼</div>
                </div>
                <div>
                  <ul>
                    {propsData !== undefined && (
                      propsData['menuList'].map((list,index) => (
                        <li key={list.id} style={{background: list.color}} >{list.name}</li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </td>
            <td id={'tbody_tr_td_function:' + index}>
              <button onClick={() => editMenu(index, menu)}>수정</button>
              <button onClick={() => deleteMenu(index, menu)}>삭제</button>
            </td>
          </tr>

          ))}
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