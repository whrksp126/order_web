import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
    console.log(listName);
    axios.post('/add_menu_list', {'list_name' : listName})
      .then((res) => {
        console.log('list 생성에 성공하였습니다.')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <form onSubmit={add_menu_list}>
        <label>리스트 명 : </label>
        <input type="text" name="list" value={listName} required onChange={(e)=>{setListName(e.target.value)}} />
        <input type="submit" value="리스트 저장" />
      </form>
      <div>
        <h2>리스트 목록</h2>
        {menuList &&  menuList.map((list,index) => (
        <div key={index}>
          <span>{list.id}</span>{list.name}
        </div> 
        ))
        }
      </div>
    </div>
  )
}

export default Admin