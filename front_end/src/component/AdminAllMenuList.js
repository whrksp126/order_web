import React, { useEffect, useState } from 'react'

const AdminAllMenuList = (props) => {
  
  return (
    <>
    {props.menuList && 
      <>
        <h2>모든 리스트</h2>{
        props.menuList.map((list,index) => (
          <button onClick={()=>{props.changeSelectList(list.id)}} 
            key={list.id}
          >
            {list.name}
          </button>
        ))}
        {
          props.changeMenuList && 
          <>
            <table>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {props.changeMenuList.map((list,index) =>(
                <tr key={index}>
                  <td>{list.name}</td>
                  <td>{list.price}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </>
        }
      </>
      }
    </>
  )
}

export default AdminAllMenuList