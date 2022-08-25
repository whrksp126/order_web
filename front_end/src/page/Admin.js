import axios from 'axios';
import React, { useState } from 'react'

const Admin = () => {
  const [listName, setListName] = useState('');

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
        <input type="text" name="list" value={listName} onChange={(e)=>{setListName(e.target.value)}} />
        <input type="submit" value="리스트 저장" />
      </form>
    </div>
  )
}

export default Admin