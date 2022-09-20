import React, { useState } from 'react'
import { message, Popconfirm, Space, Table, Tag } from 'antd';
import axios from 'axios';

const AdminAllMenu = (props) => {

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});


  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    console.log(filters)
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  let menu_list_filters = [];
  if(props.menuList !== null){
    props.menuList.forEach((list, index) => {
      menu_list_filters.push({
        text: list.name,
        value: list.name,
      })
    })
  }
  
  const columns = [
    {
      title: '메뉴명',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '가격',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: '이미지',
      dataIndex: 'img_url',
      key: 'img_url',
    },
    {
      title: '설명',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '리스트',
      key: 'list',
      dataIndex: 'list',
      filters: menu_list_filters,
      filteredValue: filteredInfo.list || null,
      // return 값이 true 이면 해당 record 데이터를 보여준다
      onFilter: (value, record) => {
        let hasMenuList = [];
        record.lists.forEach((list) => {
          hasMenuList.push(list.name);
        })
        return hasMenuList.includes(value)
      },
      // 리스트를 tag 형식으로 출력한다.
      render: (_, { lists }) => (
        <>
          {lists.map((list) => {
            
            // let color = list.length > 5 ? 'geekblue' : 'green';
  
            // if (list === '메인메뉴') {
            //   color = 'volcano';
            // }
  
            return (
              <Tag color={list.color} key={list.id}>
                {list.name}
              </Tag>
            );
          })}
        </>
      ),
      ellipsis: true,
    },
    {
      title: '기능',
      dataIndex: '기능',
      render: (_, record) =>(
        <Popconfirm title="정말 '삭제' 하시겠습니까?" onConfirm={() => handleDelete(record)}>
          <a>Delete</a>
        </Popconfirm>
      )
    },
  ];

  let data = [];
  if(props.menusLists !== null){
    props.menusLists.forEach((menu, index) =>  {
      let list_name_array = []
      if(menu.menu_list.length > 0){
        menu.menu_list.forEach((list) => {
          list_name_array.push({
            name : list.list_name,
            id : list.list_id,
            color : list.list_color,
          })
        })
      }      
      data.push({
        "key": index,
        "id": menu.id,
        "name": menu.name,
        "price": menu.price,
        "img_url": menu.img_url,
        "description": menu.description,
        
        "lists": list_name_array
      })
      list_name_array = []
    })

  }

  const handleDelete = (data) => {
    const input_List = { "menu_id" : data.id }
    console.log(input_List)
    axios.post("/admin/delete_menu", input_List)
    .then((res)=> {
      if(res.data.status === 200){
        message.success(res.data.message);
      }
      if(res.data.status === 404){
        message.error(res.data.message)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <h2>모든 메뉴</h2>
      {/* {props.menus && <>
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
            {props.menusLists.map((menu, index) =>(
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
      </>} */}

      <Table columns={columns} dataSource={data}  onChange={handleChange} />
    </>
  )
}

export default AdminAllMenu