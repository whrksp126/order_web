import React from 'react'
import { useState } from 'react'
import InputSeletList from './InputSeletList'

const TrMenuComponent = ({menuKey, menuData, propsData, server_url}) => {
  const [nowEdit, setNowEdit] = useState(false);
  
  // 메뉴 수정 기능
  const editMenu = (index, menu) => {
    
    console.log(menu, index)
    // // inputElement
    // const inputName = `<input type="text" name="name" value="${menu.name}" />`
    // const inputPrice = `<input type="Number" name="price" value="${menu.price}" />`
    // const inputDescription = `<input type="text" name="description" value="${menu.description}" />`
    // // const inputImg = `<input type="image" name="img_url" src="${server_url}/uploads/${menu.img_url}" />`
    // const inputImg = `<img src="${server_url + '/uploads/' + menu.img_url}" alt=${menu.img_url} style="width: 70px" /><input type="file" name="img_url" />`
    // const inputfunctionButton = `<button>저장</button><button>취소</button>`
    // // targetElement
    // const item_name = document.getElementById('tbody_tr_td_name:' + index)
    // const item_price = document.getElementById('tbody_tr_td_price:' + index)
    // const item_image = document.getElementById('tbody_tr_td_image:' + index)
    // const item_description = document.getElementById('tbody_tr_td_description:' + index)
    // // const item_menuList = document.getElementById('tbody_tr_td_menuList:' + index)
    
    // const imem_function = document.getElementById('tbody_tr_td_function:' + index)

    // // innerHTML
    // item_name.innerHTML = inputName;
    // item_price.innerHTML = inputPrice;
    // item_image.innerHTML = inputImg;
    // item_description.innerHTML = inputDescription;

    // document.getElementById('inputListComponent:' + index).style.display = 'block'
    // document.getElementById('show_menuList:' + index).style.display = 'none'

    // imem_function.innerHTML = inputfunctionButton;

    setNowEdit(true);
  }

  // 메뉴 삭제 기능
  const deleteMenu = (index, menu) => {
    console.log(menu, index)
  }

  const cancelEdit = () => {
    setNowEdit(false);

  }

  const saveMenu = () => {

  }

  

  return (
    <tr key={menuKey} id={'tbody_tr:'+menuKey} >
      <td id={'tbody_tr_td_name:' + menuKey}>
        {nowEdit ? (
          <input type="text" name="name" value={menuData.name} />
        ) : (
          <>{menuData.name}</>
        )}
      </td>
      <td id={'tbody_tr_td_price:' + menuKey} style={{float: 'right'}}>
        {nowEdit ? (
          <input type="Number" name="price" value={menuData.price} />
        ) : (
          <>{menuData.price.toLocaleString()} 원</>
        )}
      </td>
      <td id={'tbody_tr_td_image:' + menuKey}>
        {nowEdit ? (
          <>
            <img src={server_url + '/uploads/' + menuData.img_url} alt={menuData.img_url} style={{width: '70px'}} />
            <input type="file" name="img_url" />
          </>
        ) : (
          <img src={server_url + '/uploads/' + menuData.img_url} alt={menuData.img_url} style={{width: '70px'}} />
        )}
      </td>
      <td id={'tbody_tr_td_description:' + menuKey}>
        {nowEdit ? (
          <input type="text" name="description" value={menuData.description} />
        ) : (
          <>{menuData.description}</>
        )}
      </td>
      <td id={'tbody_tr_td_menuList:' + menuKey}>
        {nowEdit ? (        
          // <div></div>
          <InputSeletList menuKey={menuKey} menu={menuData} propsData={propsData} />
        ) : (
          <div id={'show_menuList:' + menuKey} style={{display: 'flex', justifyContent: 'start', gap: '10px'}}>
            {menuData.menu_list.length !== 0 && (
              menuData.menu_list.map((list, index) => (
                <div key={index} id={'list_id_'+list.list_id} style={{background : list.list_color, padding : '5px',borderRadius: '10px'}} >{list.list_name}</div>
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
            <button onClick={() => deleteMenu(menuKey, menuData)}>삭제</button>
          </>
        )}

      </td>
    </tr>
  )
}

export default TrMenuComponent