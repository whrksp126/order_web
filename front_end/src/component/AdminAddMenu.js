import React, { useState } from 'react'
import axios from 'axios';

import { Col, InputNumber, Row, Select, Upload, message, Tag } from 'antd';
import { Button, Form, Input } from 'antd';

const AdminAddMenu = (props) => {
  
  const [input_MenuList, setInput_MenuList] = useState();
  const [fileList, setFileList] = useState([]);
  const [ form ] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  const handleChangeInput_MenuList = (e, value) => {
    let new_menuList = [];
    value.forEach((item)=>{
      new_menuList.push(Number(item.value.split(':')[1]))
    })
    new_menuList.sort()
    setInput_MenuList(new_menuList);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const beforeUpload = (file) => {
    // return false;
    setFileList(fileList.concat(file));
    return false;	// 파일 선택시 바로 업로드 하지 않고 후에 한꺼번에 전송하기 위함
        
  }
  
  const onFinish = (values) => {
    let files = fileList
    console.log(files)
    let formData = new FormData();
    let MenuData = {
      name: values['name'], 
      price: values['price'],
      description: values['description'],
      menu_list: values['menu_list']
    }
    console.log('values.image,',values.image[0].originFileObj)
    formData.append('file', values.image[0].originFileObj)
    for(let key in MenuData) {
    	formData.append(key, MenuData[key]);
    }
    axios.post("/admin/add_menu", formData, 
    {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    ).then((res)=>{
      if(res.data.status === 200){
        message.success(res.data.message);
      }
      if(res.data.status === 404){
        message.error(res.data.message)
      }
    }).catch((err) => {
      console.log(err)
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


  return (
    <>      
      <h2>메뉴 추가</h2>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout='horizontal'
        form={form}
        onFinish={onFinish}
        initialValues={{remember: true,}}
      >
        <Form.Item label="메뉴명"  name={"name"}>
          <Input placeholder="input placeholder" />
        </Form.Item >
        <Form.Item label="가격"  name={"price"}>
          <InputNumber  style={{width: '100%',}}/>
        </Form.Item>    
        <Form.Item label="이미지" name={"image"} getValueFromEvent={normFile} valuePropName="fileList">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            beforeUpload={beforeUpload}
          >
            {fileList.length < 1 && '+ Upload'}
          </Upload>
        </Form.Item>
        <Form.Item label="설명" name={"description"}>
          <TextArea rows={2} />
        </Form.Item>
        {props.menuList && 
        <>
        <Form.Item label="리스트" name={"menu_list"} >
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          showSearch
          optionFilterProp="label"
          // defaultValue={['gold', 'cyan']}
          style={{
            width: '100%',
          }}
          options={options}
        />
          {/* <Select
            mode="multiple"
            style={{
              width: '100%',
            }}
            name="menu_list"
            placeholder="리스트를 선택해 주세요"
            onChange={handleChangeInput_MenuList}
            optionLabelProp="label"
          >
            { 
              props.menuList.map((list, index) => (
                <Option value={`${list.name}:${list.id}`} key={index}  label={list.name}>
                  <div className="demo-option-label-item">
                    <span role="img" aria-label={list.name}>
                    </span>
                    {list.name}
                  </div>
                </Option>
              ))
            }
          </Select> */}
        </Form.Item>
        </>
        }
        <Form.Item >
          <Row>
            <Col >
              <Button  type="primary"  htmlType={"submit"}>
                메뉴 추가
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  )
}

export default AdminAddMenu