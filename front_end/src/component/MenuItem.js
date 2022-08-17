import React from 'react'
import './MenuItem.css'

const MenuItem = ({name, price, url}) => {
  return (
    <div className="menuItem">
      <div>
        <img src={'images/' + url}alt={"foodeImage"} />
      </div>
      <div className="menuInfo">
        <div>{name}</div>
        <div>{price}원</div>
      </div>
    </div>   
  )
}

export default MenuItem;