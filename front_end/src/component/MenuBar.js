import React from 'react'

let menuList = 
[
  {
    'listName' : '추천메뉴',
    'listId' : 1,
  }, 
  {
    'listName' : '식사류',
    'listId' : 2,
  }, 
  {
    'listName' : '안주류',
    'listId' : 3,
  },
  {
    'listName' : '주류',
    'listId' : 4,
  }, 
  {
    'listName' : '기타요청',
    'listId' : 5,
  }
]


const MenuBar = ({currentList, setCurrentList}) => {
  
  const changeMenuList = (list) => {
    setCurrentList(list.listId)
  }

  return (
    <ul style={{listStyle :'none', width :'15vw',}}>
      {menuList.map((list,index) => (
      <li key={index}>
        <button onClick={()=>{changeMenuList(list)}}>{list.listName}</button>
      </li>
      ))}
    </ul>
  )
}

export default MenuBar