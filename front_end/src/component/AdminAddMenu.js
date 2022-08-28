import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AdminAddMenu = () => {
  
  const [menuName, setMenuName] = useState('');
  const [menuItems, setMenuItems] = useState();

  const call_list = async () => {
    const posts = await axios.post('/menu_items')
    setMenuItems(posts.data)
  }
  useEffect( () => {
    call_list();
  },[])


  return (
    <div>
      <h2>메뉴 추가</h2>
      <form>
        <label>메뉴 명 : </label>
        <input type="text" name="list" required onChange={(e)=>{}} />
        <label>가격 : </label>
        <input type="number" name="list" required onChange={(e)=>{}} />
        <label>이미지 : </label>
        <input type="text" name="list" required onChange={(e)=>{}} />
        <label>설명 : </label>
        <input type="text" name="list" onChange={(e)=>{}} />
        <input type="submit" value="메뉴 저장" />
      </form>
      <div>
        <h2>메뉴 목록</h2>
        <table>
          <thead>
            <tr>
              <th>
                번호
              </th>
              <th>메뉴 명</th>
              <th>가격</th>
              <th>이미지</th>
              <th>설명</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
          {menuItems &&  menuItems.map((menu, index) => (
            <tr key={index}>
              <th>{index+1}</th>
              <td>{menu.name}</td>
              <td>{menu.price}</td>
              <td>{menu.img_url}</td>
              <td>{menu.description}</td>
              <td><button>삭제</button></td>
            </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminAddMenu