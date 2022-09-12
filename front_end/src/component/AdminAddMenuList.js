import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const AdminAddMenuList = () => {

  const [input_List, setInput_List] = useState({name: '',description: ''})
  const handleChangeInput_List = (e) => {
    setInput_List({
        ...input_List,
        [e.target.name] : e.target.value
      });
  };
  
  const submit_AddList = (e) => {
    e.preventDefault();
    axios.post("/admin/add_list", input_List)
      .then((res)=> {
        if(res.data.status === 200){
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
        if(res.data.status === 404){
          toast.error(res.data.message,{
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <>
      <h2>리스트 추가</h2>
      <form onSubmit={submit_AddList}>
      <label>리스트명</label>
      <input type="text" name="name"
          value={input_List.name} onChange={handleChangeInput_List} required
          placeholder="추천메뉴"
        />
        <label>설명</label>
        <input type="textarea" name="description"
            value={input_List.description} onChange={handleChangeInput_List}
            placeholder=""
          />
        <button type="submit">리스트 추가</button>
      </form>
    </>
  )
}

export default AdminAddMenuList