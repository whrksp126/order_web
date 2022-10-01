import React, { useState } from 'react'
import { Button, Form, Image, Input, InputNumber, message, Popconfirm, Select, Space, Table, Tag, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import axios from 'axios';


const AdminAllMenu = (props) => {

  const [form] = Form.useForm();

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      price: '',
      img_url: '',
      lists: '',
      description: '',
        ...record,
    });
    setEditingKey(record.key);
  };

  const handleChange = (pagination, filters, sorter) => {
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
      editable: true,
      render: (text) => <a>{text}</a>,
    },
    {
      title: '가격',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
      ellipsis: true,
      editable: true,
    },
    {
      title: '이미지',
      dataIndex: 'img_url',
      key: 'img_url',
      editable: true,
      render: (img_url) => (
        <Upload
          showUploadList={{
            showDownloadIcon: false,
            showRemoveIcon: false,
          }}
          defaultFileList={[{
              name: img_url,
              status: 'done',
              url: `http://localhost:5000/uploads/${img_url}`,
          }]}
        >
        </Upload>
      )
    },
    {
      title: '설명',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    },
    {
      title: '리스트',
      key: 'list',
      dataIndex: 'list',
      filters: menu_list_filters,
      filteredValue: filteredInfo.list || null,
      editable: true,
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
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="정말 취소 하시겠습니까?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : 
        ( 
          <>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm title="정말 '삭제' 하시겠습니까?" onConfirm={() => handleDelete(record)}>
              <a>Delete</a>
            </Popconfirm>
          </>
        )
      }
    },
  ];

  let data_list = [];
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
      data_list.push({
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

  const [data, setData] = useState(data_list);


  const handleDelete = (data) => {
    const input_List = { "menu_id" : data.id }
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

  const options = [];
  if(props.menuList !== null){
    props.menuList.forEach((item) => {
      options.push({
        // value: `${item.name}:${item.color}:${item.id}`,
        // value: item.color,
        value: item.id,
        label: item.name,
        color: item.color,
      })
    })
  }

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
  
    const color = options.find(option => option.value === value).color;
    
    return (
      <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    let inputNode;
    const [hasImg, setHasImg] = useState(false);
    if(inputType === 'number'){
      inputNode = <InputNumber />
    }
    else if(inputType === 'upload'){
      inputNode = <Upload
        listType="picture"
        showUploadList={{
          showDownloadIcon: false,
        }}
        onChange={(file)=>{
          if(file.status !== 'uploading') {
            const fileListLength = file['fileList'].length;
            fileListLength < 1 ? setHasImg(true) : setHasImg(false)
          }
        }}
        defaultFileList={[{
          uid: record.id,
          name: record.img_url,
          status: 'done',
          url: `http://localhost:5000/uploads/${record.img_url}`,
        }]}
        maxCount={1}
        beforeUpload={false}
      >
        {hasImg &&<Button icon={<UploadOutlined />}>이미지 추가</Button>}
      </Upload>
    }
    else if(inputType === 'select'){
      inputNode = <Select           
        mode="multiple"
        showArrow
        tagRender={tagRender}
        showSearch
        optionFilterProp="label"
        defaultValue={[...new Set(record.lists.map(item => item.id))]}
        style={{
          width: '100%',
        }}
        options={options}
      />
    }else{
      inputNode = <Input />
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            // rules={[
            //   {
            //     required: true,
            //     message: `Please Input ${title}!`,
            //   },
            // ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  const save = async (key) => {
    try{
      const edit_data = await form.validateFields();
      if(edit_data['list'] === undefined) {
        edit_data['list'] = data_list[key]['lists']
      }
      let newData = data_list;
      const index = newData.findIndex((item) => key === item.key);
      if( index > -1){
        const item = newData[index];
        newData.splice(index, 1, {...item, ...edit_data});
        setData(newData);
        setEditingKey('');
        console.log('if 성공')
      }else{
        newData.push(edit_data);
        setData(newData);
        setEditingKey('');
        console.log('else 성공')
      }
    }catch(errInfo){
      console.log('catch')
      console.log('Validate Failed:', errInfo);
    }
    // console.log(edit_data['name'])
    // console.log(edit_data['price'])
    // console.log(edit_data['description'])
    // console.log(edit_data['img_url'])
    // console.log(edit_data['list'])

    // try {
    //   const row = await form.validateFields();
    //   const newData = [...data];
    //   const index = newData.findIndex((item) => key === item.key);

    //   if (index > -1) {
    //     const item = newData[index];
    //     newData.splice(index, 1, { ...item, ...row });
    //     setData(newData);
    //     setEditingKey('');
    //   } else {
    //     newData.push(row);
    //     setData(newData);
    //     setEditingKey('');
    //   }
    // } catch (errInfo) {
    //   console.log('Validate Failed:', errInfo);
    // }
  };

  const cancel = () => {
    setEditingKey('');
  };
  
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    let input_type;
    if(col.dataIndex === 'price'){
      input_type = 'number'
    }else if(col.dataIndex === 'img_url'){
      input_type = 'upload'
    }else if(col.dataIndex === 'list'){
      input_type = 'select'
    }else{
      input_type = 'text'
    };
    return {
      
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === 'price' ? 'number' : 'text',
        inputType: input_type,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <h2>모든 메뉴</h2>
      <Form form={form} component={false}>
        <Table 
          components={{ body: { cell: EditableCell, }}} 
          columns={mergedColumns} 
          dataSource={data_list} 
          onChange={handleChange} 
          rowClassName="editable-row"
          />
      </Form>
    </>
  )
}

export default AdminAllMenu