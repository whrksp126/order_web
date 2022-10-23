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

  // menuLIstApi.map((menu, index) => (
  //   console.log('menu,', menu)

  // ))

  // menusLists !== undefined && menusLists.map((menu, index) => {
  //   menu.menu_list.forEach((list) => {
  //     if(list.list_id === currentList){
  //       console.log(menu)
  //     }
  //   })
  // })

  return (
    <div className="MenuList" style={{display: 'flex'}}>
      <MenuBar currentList={currentList} setCurrentList={setCurrentList} />
      <div>

      {
        menusLists !== undefined && menusLists.map((menu, index) => {
          let targetMenu = undefined;
          menu.menu_list.forEach((list) => {
            if(list.list_id === currentList){
              targetMenu = menu
            } 
          })
          return ( targetMenu !== undefined && 
            <MenuItem 
              key={index} 
              id={targetMenu.id}
              name={targetMenu.name} 
              price={targetMenu.price} 
              url={`http://192.168.35.227:5000/uploads/${targetMenu.img_url}`} /> 
          )
        })
      }

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