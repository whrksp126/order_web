import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';

const AdminAllMenuList = (props) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
  
            if (tag === 'loser') {
              color = 'volcano';
            }
  
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  return (
    <>
    <Table columns={columns} dataSource={data} />
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