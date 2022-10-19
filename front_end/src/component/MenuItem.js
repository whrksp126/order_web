import React from 'react'
import './MenuItem.css'
import { useDrag } from 'react-dnd'


const MenuItem = ({name, price, url}) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    item: { price, name, url },
		// "type"이 필요합니다. 놓기 대상의 "accept" 사양에서 사용됩니다..
    type: 'BOX',
		// 수집 기능은 DnD 시스템에서 중요한 상태 조각을 가져오기 위해 "모니터" 인스턴스(이것이 무엇인지에 대한 개요 참조)를 사용합니다.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item) => {
      // console.log(`${item.price} ${item.name} ${item.url}`)
    },
  }))
  
  return (
    <div className="menuItem">
      <div style={{ opacity: isDragging ? 0.5 : 1}}>
        <img ref={drag} src={url} alt={"foodeImage"} />
      </div>
      <div className="menuInfo">
        <div>{name}</div>
        <div>{price}원</div>
      </div>
    </div>
  )
}

export default MenuItem;