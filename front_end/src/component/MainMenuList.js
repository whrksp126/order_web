import React from 'react'

const MainMenuList = () => {

  const img_Url = "images/dubblefood.png"
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

  return (
    <div style={{height:"78vh", padding: "2rem", padding: "1em", justifyContent: "start", alignItems: "self-start", display: "flex", flexFlow: "wrap"}}>
      {
        foodApi.map(food=> (
          <div style={{ display:"inline-block", borderRadius:"2px" }}>
            <div>
              <img src={'images/' + food.foodUrl} style={{width:"200px", height:"180px"}} alt={"foodeImage"} />
            </div>
            <div style={{ textAlign:"center"}}>
              <div>{food.foodName}</div>
              <div>{food.foodPrice}원</div>
            </div>
          </div>    
        ))
      }
    </div>
  )
}

export default MainMenuList