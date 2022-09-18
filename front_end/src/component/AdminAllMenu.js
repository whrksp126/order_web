import React from 'react'
import { Space, Table, Tag } from 'antd';

const AdminAllMenu = (props) => {

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
      render: (_, { lists }) => (
        <>
          {lists.map((list) => {
            
            // let color = list.length > 5 ? 'geekblue' : 'green';
  
            // if (list === '메인메뉴') {
            //   color = 'volcano';
            // }
  
            return (
              <Tag color={list.color} key={list.id}>
                {list.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '기능',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>수정</a>
          <a>삭제</a>
        </Space>
      ),
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
        "name": menu.name,
        "price": menu.price,
        "img_url": menu.img_url,
        "description": menu.description,
        
        "lists": list_name_array
      })
      list_name_array = []
    })

  }

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
      </>}

      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default AdminAllMenu