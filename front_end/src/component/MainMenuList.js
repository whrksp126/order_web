import React from 'react'
import MenuItem from './MenuItem'
import './MainMenuList.css'

let foodApi = 
[
  {
    'foodName' : '짬짜면',
    'foodPrice' : '9500',
    'foodUrl' : 'dubblefood.png',
  }, 
  {
    'foodName' : '짜장면',
    'foodPrice' : '8500',
    'foodUrl' : 'blacknoodle.png',
  }, 
  {
    'foodName' : '짬뽕',
    'foodPrice' : '9000',
    'foodUrl' : 'rednoddle.png',
  },
  {
    'foodName' : '미니탕수육',
    'foodPrice' : '12000',
    'foodUrl' : 'miniforkfry.png',
  }, 
  {
    'foodName' : '군만두',
    'foodPrice' : '7500',
    'foodUrl' : 'frymandu.png',
  },
  {
    'foodName' : '칸쇼새우',
    'foodPrice' : '18000',
    'foodUrl' : 'chillshrip.png',
  }, 
  {
    'foodName' : '새우볶음밥',
    'foodPrice' : '8500',
    'foodUrl' : 'shrimprice.png',
  }
]

const MainMenuList = () => {

  return (
    <div className="MenuList">
      {
        foodApi.map((food, index)=> (
          <MenuItem key={index} name={food.foodName} price={food.foodPrice} url={food.foodUrl} /> 
        ))
      }
    </div>
  )
}

export default MainMenuList