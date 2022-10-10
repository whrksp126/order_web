import React from 'react'

const InputSeletList = ({menuKey, menu, propsData}) => {
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
    <div id={'inputListComponent:' + menuKey} style={{ position: 'relative',}}> 
      <div onClick={()=>{showList(menuKey)}} style={{border: '1px solid #d9d9d9',background: 'white' , padding: '5px',display: 'flex',justifyContent: 'space-between',borderRadius: '5px', alignItems: 'center'}}>
        <div id={'showSeletList:' + menuKey} style={{display: 'flex', gap: '5px', width: '92%', }} >
          {menu.menu_list.length !== 0 && (
            menu.menu_list.map((list, index) => {
              
              console.log(menu.menu_list);
              return (
                <div key={index} id={'list_id_'+ menuKey + '_' + list.list_id} style={{background : list.list_color, padding : '2px',borderRadius: '2px', display:'flex', alignItems: 'center', fontSize: '12px', height: '24px', gap: '4px'}} >
                  <div>{list.list_name}</div>
                  <button onClick={()=>{deleteList(`${menuKey}_${list.list_id}`)}} style={{border: 'none', background: 'none', color: 'rgb(85, 77, 55)', padding: '0'}}>X</button>
                </div>
              )
            })
          )}
          <input id={'inputList:' + menuKey} type="text" name="searchList" style={{ flexGrow: '1', outline: 'none', border: 'none',}} />
        </div>
        <div id={'menuListSelet:' + menuKey}>더보기</div>
      </div>

      <div id={'selectListOptions:' + menuKey} style={{background: 'white', boxShadow: '5px 5px 15px 0px rgb(0 0 0 / 20%)', display: 'none', position: 'absolute', width: '100%', zIndex: '1'}}>
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

    </div>
  )
}

export default InputSeletList