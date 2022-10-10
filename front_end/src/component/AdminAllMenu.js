import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, InputNumber, message, Popconfirm, Select, Space, Table, Tag, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import axios from 'axios';
import InputSeletList from './InputSeletList';

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

  // 메뉴 수정 기능
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

  // 메뉴 삭제 기능
  const deleteMenu = (index, menu) => {
    console.log(menu, index)
  }
  // input select 더보기 버튼

  // input에 포커스가 되면 list를 보여주고 > list 를 클릭하면 추가 후 다시 포커스 해주고,
  // list를 취소하면 삭제하고 다시 포커스 > 포커스 아웃하면 리스트 none 한다.
  const showList = (index) => {
    document.getElementById('selectListOptions:' + index).style.display = "block";
  }

  const deleteList = (target_id) => {
    document.getElementById(`list_id_${target_id}`).remove();
  }
  const addList = (menuKey, list) => {
    const newList = 
    `
      <div id='list_id_${menuKey}_${list.id}' style='background:${list.color}; padding:2px;border-radius: 2px; display:flex; align-items: center; font-size: 12px; height: 24px; gap: 4px;' >
        <div>${list.name}</div>
        <button id='list_delete_button:${menuKey}_${list.id}' style='border: none; background: none; color: rgb(85, 77, 55); padding: 0;'>X</button>
      </div>
    `
    document.getElementById(`inputList:${menuKey}`).insertAdjacentHTML('beforebegin', newList);
    document.getElementById(`list_delete_button:${menuKey}_${list.id}`).onclick = (()=>deleteList(`${menuKey}_${list.id}`))
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
          {showMenuData !== undefined && showMenuData.map((menu, index) => {  
            const menuKey = index;
            const menuData = menu;
            return (
            <tr key={menuKey} id={'tbody_tr:'+menuKey} >
              <td id={'tbody_tr_td_name:' + menuKey}>{menu.name}</td>
              <td id={'tbody_tr_td_price:' + menuKey} style={{float: 'right'}}>{menu.price.toLocaleString()} 원</td>
              <td id={'tbody_tr_td_image:' + menuKey}>
                <img src={server_url + '/uploads/' + menu.img_url} alt={menu.img_url} style={{width: '70px'}} />  
              </td>
              <td id={'tbody_tr_td_description:' + menuKey}>{menu.description}</td>
              <td id={'tbody_tr_td_menuList:' + menuKey}>
                {/* <div style={{display: 'flex', justifyContent: 'start', gap: '10px'}}>
                  {menu.menu_list.length !== 0 && (
                    menu.menu_list.map((list, index) => (
                      <div key={index} id={'list_id_'+list.list_id} style={{background : list.list_color, padding : '5px',borderRadius: '10px'}} >{list.list_name}</div>
                    ))
                  )}
                </div> */}
                <InputSeletList menuKey={menuKey} menu={menuData} propsData={propsData} />
                {/* <div style={{ position: 'relative', }}>
                  <div onClick={()=>{showList(menuKey)}} style={{border: '1px solid #d9d9d9',background: 'white' , padding: '5px',display: 'flex',justifyContent: 'space-between',borderRadius: '5px', alignItems: 'center'}}>
                    <div id={'showSeletList:' + menuKey} style={{display: 'flex', gap: '5px', width: '92%', }} >
                      {menu.menu_list.length !== 0 && (
                        menu.menu_list.map((list, index) => (
                          <div key={index} id={'list_id_'+ menuKey + '_' + list.list_id} style={{background : list.list_color, padding : '2px',borderRadius: '2px', display:'flex', alignItems: 'center', fontSize: '12px', height: '24px', gap: '4px'}} >
                            <div>{list.list_name}</div>
                            <button onClick={()=>{deleteList(`${menuKey}_${list.list_id}`)}} style={{border: 'none', background: 'none', color: 'rgb(85, 77, 55)', padding: '0'}}>X</button>
                          </div>
                        ))
                      )}
                      <input id={'inputList:' + menuKey} type="text" name="searchList" style={{ flexGrow: '1', outline: 'none', border: 'none',}} />
                    </div>
                    <div id={'menuListSelet:' + index}>더보기</div>
                  </div>

                  <div id={'selectListOptions:' + index} style={{background: 'white', boxShadow: '5px 5px 15px 0px rgb(0 0 0 / 20%)', display: 'none', position: 'absolute', width: '100%', zIndex: '1'}}>
                    <ul style={{listStyle:'none', padding: '0' }} >
                      {propsData !== undefined && (
                        propsData['menuList'].map((list, index) => (
                          <li onClick={()=>{addList(menuKey, list)}} key={list.id} >
                            <div>{list.name}</div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                </div> */}
              </td>
              <td id={'tbody_tr_td_function:' + index}>
                <button onClick={() => editMenu(index, menu)}>수정</button>
                <button onClick={() => deleteMenu(index, menu)}>삭제</button>
              </td>
            </tr>

          )}
          )}
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