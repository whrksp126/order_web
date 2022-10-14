import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const InputSeletList = ({menuKey, menu, propsData}) => {
  
  return (
    <Select options={menu.menu_list} />
  )
}

export default InputSeletList

// import React, { useEffect, useState } from 'react'

// const InputSeletList = ({menuKey, menu, propsData}) => {
//   // input에 포커스가 되면 list를 보여주고 > list 를 클릭하면 추가 후 다시 포커스 해주고,
//   // list를 취소하면 삭제하고 다시 포커스 > 포커스 아웃하면 리스트 none 한다.
//   const [selectList, setSelectList] = useState(menu.menu_list)
//   const showList = (index) => {
//     document.getElementById('selectListOptions:' + index).style.display = "block";
//   }

//   const deleteList = (target_id) => {
//     const target_list_id = target_id.split('_')[1];
//     document.getElementById(`list_id_${target_id}`).remove();
//     const delectListIndex = selectList.findIndex(list => list.list_id === Number(target_list_id))
//     let newSelectList = selectList;
//     newSelectList.splice(delectListIndex,1)
//     setSelectList(newSelectList);
//     changeCheckListColor(Number(target_list_id), 'delete')

//   }

//   const addList = (menuKey, list) => {
//     const is_already_list = selectList.find(more_list => more_list.list_id === Number(list.id)) !== undefined ? true : false;
//     if(is_already_list) {
//       alert('이미 선택한 리스트에요');
//     }else{
//       const newList = `<div id='list_id_${menuKey}_${list.id}' style='background:${list.color}; padding:2px;border-radius: 2px; display:flex; align-items: center; font-size: 12px; height: 24px; gap: 4px;' ><div>${list.name}</div><button id='list_delete_button:${menuKey}_${list.id}' style='border: none; background: none; color: rgb(85, 77, 55); padding: 0;'>X</button></div>`
//       document.getElementById(`inputList:${menuKey}`).insertAdjacentHTML('beforebegin', newList);
//       document.getElementById(`list_delete_button:${menuKey}_${list.id}`).onclick = (()=>deleteList(`${menuKey}_${list.id}`))
//       document.getElementById(`selectListMenuId:${menuKey}_${list.id}`).style.background = '#e6f7ff;'
//       const addListObject = {'list_color': list.color, 'list_id': list.id, 'list_name': list.name}
//       setSelectList([...selectList, addListObject])
//       changeCheckListColor(list.id, 'add')
//     }
//   }

//   const changeCheckListColor = (list_id, state) => {
//     if(state === 'add'){
//       document.getElementById(`selectListMenuId:${menuKey}_${list_id}`).style.background='#93def3'
//     }else if(state === 'delete'){
//       document.getElementById(`selectListMenuId:${menuKey}_${list_id}`).style.background='none'
//     }
//   }

//   useEffect(()=>{
//     if(selectList !== null){
//       selectList.forEach((list)=> {
//         changeCheckListColor(list.list_id, 'add')
//       })
//     }
//   },[])

//   return (
//     <div id={'inputListComponent:' + menuKey} style={{ position: 'relative',}}> 
//       <div onClick={()=>{showList(menuKey)}} style={{border: '1px solid #d9d9d9',background: 'white' , padding: '5px',display: 'flex',justifyContent: 'space-between',borderRadius: '5px', alignItems: 'center'}}>
//         <div id={'showSeletList:' + menuKey} style={{display: 'flex', gap: '5px', width: '92%', }} >
//           {menu.menu_list.length !== 0 && (
//             menu.menu_list.map((list, index) => {
//               return (
//                 <div key={index} id={'list_id_'+ menuKey + '_' + list.list_id} style={{background : list.list_color, padding : '2px',borderRadius: '2px', display:'flex', alignItems: 'center', fontSize: '12px', height: '24px', gap: '4px'}} >
//                   <div>{list.list_name}</div>
//                   <button onClick={()=>{deleteList(`${menuKey}_${list.list_id}`)}} style={{border: 'none', background: 'none', color: 'rgb(85, 77, 55)', padding: '0'}}>X</button>
//                 </div>
//               )
//             })
//           )}
//           <input id={'inputList:' + menuKey} type="text" name="searchList" style={{ flexGrow: '1', outline: 'none', border: 'none',}} />
//         </div>
//         <div id={'menuListSelet:' + menuKey}>더보기</div>
//       </div>

//       <div id={'selectListOptions:' + menuKey} style={{background: 'white', boxShadow: '5px 5px 15px 0px rgb(0 0 0 / 20%)', display: 'none', position: 'absolute', width: '100%', zIndex: '1'}}>
//         <ul style={{listStyle:'none', padding: '0' }} >
//           {propsData !== undefined && (
//             propsData['menuList'].map((list, index) => (
//               <li id={`selectListMenuId:${menuKey}_${list.id}`} onClick={()=>{addList(menuKey, list)}} key={list.id} >
//                 <div>{list.name}</div>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//     </div>
//   )
// }

// export default InputSeletList