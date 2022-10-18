import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem'
import './MainMenuList.css'
import MenuBar from './MenuBar'

let menuLIstApi = 
[
  {
    'foodName' : '짬짜면',
    'foodPrice' : 9500,
    'foodUrl' : 'dubblefood.png',
    'listId' : [1, 2]
  }, 
  {
    'foodName' : '짜장면',
    'foodPrice' : 8500,
    'foodUrl' : 'blacknoodle.png',
    'listId' : [1, 2]
  }, 
  {
    'foodName' : '짬뽕',
    'foodPrice' : 9000,
    'foodUrl' : 'rednoddle.png',
    'listId' : [1, 2]
  },
  {
    'foodName' : '미니탕수육',
    'foodPrice' : 12000,
    'foodUrl' : 'miniforkfry.png',
    'listId' : [1, 3]
  }, 
  {
    'foodName' : '군만두',
    'foodPrice' : 7500,
    'foodUrl' : 'frymandu.png',
    'listId' : [1, 3]
  },
  {
    'foodName' : '칸쇼새우',
    'foodPrice' : 18000,
    'foodUrl' : 'chillshrip.png',
    'listId' : [1, 3]
  }, 
  {
    'foodName' : '새우볶음밥',
    'foodPrice' : 8500,
    'foodUrl' : 'shrimprice.png',
    'listId' : [1, 2]
  }
]


const MainMenuList = ({menuList, menusLists}) => {
  const [currentList, setCurrentList] = useState(1);
  menusLists !== undefined && menusLists.forEach((menuData)=> {
    console.log(menuData);
  })

  return (
    <div className="MenuList" style={{display: 'flex'}}>
      <MenuBar currentList={currentList} setCurrentList={setCurrentList} />
      <div>
        {menusLists !== undefined && menusLists.map((menu, index) => (
          menu.menu_list.includes(currentList) && 
          <MenuItem key={index} name={menu.name} price={menu.price} url={menu.img_url} />
        ))}

      {/* {
        menuLIstApi.map((menu, index)=> (

          menu.listId.includes(currentList) && 
          <MenuItem key={index} name={menu.foodName} price={menu.foodPrice} url={menu.foodUrl} /> 
        ))
      } */}
      
      </div>
    </div>
  )
}

export default MainMenuList