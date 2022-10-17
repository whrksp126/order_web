import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import InputSeletList from './InputSeletList'

const TrMenuComponent = ({menuKey, menuData, propsData, server_url, setPropsData}) => {
  const [nowEdit, setNowEdit] = useState(false);

  const default_submit_Data = [];
  menuData.menu_list.forEach( list => default_submit_Data.push(list.list_id))

  const [name, setName] = useState(menuData.name);
  const [price, setPrice] = useState(menuData.price);
  const [img, setImg] = useState({file: "", imagePreviewUrl: server_url + '/uploads/' + menuData.img_url});
  const [description, setDescription] = useState(menuData.description);
  const [menuList, setMenuList] = useState(default_submit_Data);
  
  const changeMenuName = (e) => {
    setName(e.target.value);
  }
  const changeMenuPrice = (e) => {
    setPrice(e.target.value);
  }
  const changeMenuDescription = (e) => {
    setDescription(e.target.value);
  }
  const changeMenuImage = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImg({ file: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };


  // 메뉴 수정 기능
  const editMenu = (index, menu) => {
    setNowEdit(true);
  }

  // 메뉴 삭제 기능
  const deleteMenu = (menu) => {
    const newMenuData = propsData.menuData.filter(propMenu => propMenu.id !== menu.id);
    
    axios.post("/admin/delete_menu", {menu_id : menu.id})
    .then((res)=>{
      if(res.data.status === 200){
        // messags.success(res.data.message);
        console.log(res.data.message);
        setPropsData({
          menuList: propsData.menuList,
          menuData: newMenuData
        })
      }
      if(res.data.status === 404){
        // message.error(res.data.message)
        console.log(res.data.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  // 메뉴 정보 변경 취소
  const cancelEdit = () => {
    setNowEdit(false);
    setName(menuData.name);
    setPrice(menuData.price);
    setImg({file: "", imagePreviewUrl: server_url + '/uploads/' + menuData.img_url});
    setDescription(menuData.description);
    setMenuList(default_submit_Data);
  }

  // 메뉴 정보 변경 저장
  const saveMenu = () => {
    const formData = {
      id: menuData.id, 
      name, 
      price, 
      description, 
      menu_list:JSON.stringify(menuList), 
      img:img.file, 
    }
    axios.post("/admin/edit_menu", formData, {
      headers: { "Content-Type": "multipart/form-data", }
    }).then((res)=>{
      if(res.data.status === 200){
        console.log(res.data.message);
        setPropsData({
          menuList: propsData.menuList,
          menuData: res.data.data
        })
        setNowEdit(false);
      }
      if(res.data.status === 404){
        console.log(res.data.message)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <tr key={menuKey} id={'tbody_tr:'+menuKey} >
      <td id={'tbody_tr_td_name:' + menuKey}>
        {nowEdit ? (
          <input type="text" name="name" defaultValue={menuData.name} onChange={(e)=>changeMenuName(e)} />
        ) : (
          <>{menuData.name}</>
        )}
      </td>
      <td id={'tbody_tr_td_price:' + menuKey} style={{float: 'right'}}>
        {nowEdit ? (
          <input type="Number" name="price" defaultValue={menuData.price} onChange={e => changeMenuPrice(e)} />
        ) : (
          <>{menuData.price.toLocaleString()} 원</>
        )}
      </td>
      <td id={'tbody_tr_td_image:' + menuKey}>
        {nowEdit ? (
          <>
            <img src={img.imagePreviewUrl} alt={menuData.img_url} style={{width: '70px'}} />
            <input type="file" name="img_url" onChange={e => changeMenuImage(e)} />
          </>
        ) : (
          <img src={server_url + '/uploads/' + menuData.img_url} alt={menuData.img_url} style={{width: '70px'}} />
        )}
      </td>
      <td id={'tbody_tr_td_description:' + menuKey}>
        {nowEdit ? (
          <input type="text" name="description" defaultValue={menuData.description} onChange={e => changeMenuDescription(e)} />
        ) : (
          <>{menuData.description}</>
        )}
      </td>
      <td id={'tbody_tr_td_menuList:' + menuKey}>
        {nowEdit ? (
          <InputSeletList menuKey={menuKey} menu={menuData} propsData={propsData} setMenuList={setMenuList} />
        ) : (
          <div id={'show_menuList:' + menuKey} style={{display: 'flex', justifyContent: 'start', gap: '10px'}}>
            {menuData.menu_list.length !== 0 && (
              menuData.menu_list.map((list, index) => (
                <div key={`${list.list_id}_${index}`} id={'list_id_'+list.list_id} style={{background : list.list_color, padding : '5px',borderRadius: '10px'}} >{list.list_name}</div>
              ))
            )}
          </div>
        )}
      </td>
      <td id={'tbody_tr_td_function:' + menuKey}>
        {nowEdit ? (
          <>
            <button onClick={()=> saveMenu()}>저장</button>
            <button onClick={() => cancelEdit()}>취소</button>
          </>
        ) : (
          <>
            <button onClick={() => editMenu(menuKey, menuData)}>수정</button>
            <button onClick={() => deleteMenu(menuData)}>삭제</button>
          </>
        )}

      </td>
    </tr>
  )
}

export default TrMenuComponent