import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AdminAddMenu from './AdminAddMenu';

const Admin = () => {
  const [listName, setListName] = useState('');
  const [menuList, setMenuList] = useState();
  const call_list = async () => {
    const posts = await axios.post('/menu_list', )
    setMenuList(posts.data)
  }
  useEffect( () => {
    call_list();
  },[])
  const add_menu_list = (e) => {
    e.preventDefault();
    axios.post('/add_menu_list', {'list_name' : listName})
      .then((res) => {
        console.log('list 생성에 성공하였습니다.')
        call_list()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const delete_menu_list = (e) => {
    e.preventDefault();
    const target_id = e.target.id.split(':')[1]
    axios.post('/delete_menu_list', {'menu_list_id' : target_id})
      .then((res) => {
        console.log('리스트 삭제에 성공하였습니다.')
        call_list()
      })
      .catch((err) => {
        console.log(err)
      }) 
  }
  return (
    <div>
      <AdminAddMenu />
      <h2>리스트 추가</h2>
      <form onSubmit={add_menu_list}>
        <label>리스트 명 : </label>
        <input type="text" name="list" value={listName} required onChange={(e)=>{setListName(e.target.value)}} />
        <input type="submit" value="리스트 저장" />
      </form>
      <div>
        <h2>리스트 목록</h2>
        <table>
          <thead>
            <tr>
              <th>
                번호
              </th>
              <th>메뉴 리스트 명</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {menuList &&  menuList.map((list,index) => (
            <tr key={index}>
              <th>{index+1}</th>
              <td>{list.name}</td>
              <td><button id={'munu_list:' + list.id} onClick={(e)=>delete_menu_list(e)}>삭제</button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admin