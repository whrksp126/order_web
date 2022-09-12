import React from 'react'

const AdminAllMenu = (props) => {
  return (
    <>
      <h2>모든 메뉴</h2>
      {props.menus && <>
        <table>
          <thead>
            <tr>
              <th>메뉴명</th>
              <th>가격</th>
              <th>설명</th>
              <th>추가기능</th>
            </tr>
          </thead>
          <tbody>
            {props.menus.map((menu, index) =>(
              <tr key={index}>
                <td>{menu.name}</td>
                <td>{menu.price}원</td>
                <td>{menu.description}</td>
                <td>
                  <button 
                  onClick={()=>console.log(menu.id)}>
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>}
    </>
  )
}

export default AdminAllMenu