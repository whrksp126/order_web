import React, { useState } from 'react'
import axios from 'axios';

import { toast } from 'react-toastify';
import { Col, InputNumber, Row, Select, Upload } from 'antd';
import { Button, Form, Input } from 'antd';

const AdminAddMenu = (props) => {
  
  const { Option } = Select;
  const [input_MenuList, setInput_MenuList] = useState();

  const handleChangeInput_MenuList = (e, value) => {
    let new_menuList = [];
    value.forEach((item)=>{
      new_menuList.push(Number(item.value.split(':')[1]))
    })
    new_menuList.sort()
    setInput_MenuList(new_menuList);
  };

  const [form] = Form.useForm();
  const { TextArea } = Input;

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const beforeUpload = ({fileList}) => {
      return false;
  }

  
  const onFinish = (values) => {
    const MenuData = {
      name: values['name'], 
      price: values['price'],
      description: values['description'],
      img_url : values['image'][0]['name'],
      menu_list: values['menu_list']
    }
    console.log('MenuData', MenuData)
    axios.post("/admin/add_menu", MenuData).then((res)=>{
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
    }).catch((err) => {
      console.log(err)
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
          </Select>
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