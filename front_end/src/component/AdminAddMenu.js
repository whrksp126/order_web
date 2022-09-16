import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import { Col, InputNumber, Row, Select, Upload } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const AdminAddMenu = (props) => {
  
  const { Option } = Select;
  const [input_Menu, setInput_Menu] = useState({
    name: '',
    price: '',
    description: '',
  });
  const [input_MenuImgUrl, setInput_MenuImgUrl] = useState();
  const [input_MenuList, setInput_MenuList] = useState();
  const [input_MenuPreviewImg, setInput_MenuPreviewImg] = useState()

  const handleChangeInput_Menu = (e) => {
    setInput_Menu({
      ...input_Menu,
      [e.target.name] : e.target.value
    });
  };
  const handleChangeInput_MenuImgUrl = (e) => {
    setInput_MenuImgUrl({
      ...input_MenuImgUrl,
      [e.target.name] : e.target.files[0].name
    });
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    new Promise((resolve) => {
      reader.onload = () => {
        setInput_MenuPreviewImg(reader.result)
        resolve();
      }
    });
  };

  const handleChangeInput_MenuList = (e, value) => {
    let new_menuList = [];
    value.forEach((item)=>{
      new_menuList.push(Number(item.value.split(':')[1]))
    })
    new_menuList.sort()
    setInput_MenuList(new_menuList);
  };

  const submit_AddMenu = (e) => {
    e.preventDefault();
    const MenuData = {
      name: input_Menu.name, 
      price: input_Menu.price,
      description: input_Menu.description,
      img_url : input_MenuImgUrl.img_url,
      menu_list: input_MenuList
    }
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
        setInput_Menu({
          name: '',
          price: '',
          description: '',
        })
        setInput_MenuImgUrl();
        setInput_MenuList();
        setInput_MenuPreviewImg();
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

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
    console.log(layout)
  };

    const { TextArea } = Input;

    const [fileList, setFileList] = useState([
      
    ]);

    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };
  
    // const onPreview = async (file) => {
    //   let src = file.url;
    //   if (!src) {
    //     src = await new Promise((resolve) => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file.originFileObj);

    //       reader.onload = () => resolve(reader.result);
    //     });
    //   }
  
    //   const image = new Image();
    //   image.src = src;
    //   const imgWindow = window.open(src);
    //   imgWindow?.document.write(image.outerHTML);
    // };
    const onFinish = (values) => {
      console.log('values', values)
    }
    
    const normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };

    const beforeUpload = ({fileList}) => {
        return  false;
    }

  return (
    <>      
      <h2>메뉴 추가</h2>
      <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout='horizontal'
      form={form}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onValuesChange={onFormLayoutChange}
    >
      <Form.Item label="메뉴명"  name={"name"}>
        <Input placeholder="input placeholder" />
      </Form.Item >
      <Form.Item label="가격"  name={"price"}>
        <InputNumber  style={{
        width: '100%',
      }}/>
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
        < >
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

      {/* 
      <form className="" onSubmit={submit_AddMenu}>
        <label>메뉴명</label>
        <input type="text" name="name"
          value={input_Menu.name} onChange={handleChangeInput_Menu} required
          placeholder="짜장면"
        />
        <label>가격</label>
        <input type="number" name='price' value={input_Menu.price} onChange={handleChangeInput_Menu} required placeholder="39900" />
        <label>이미지</label>
        <input type="file" name='img_url' onChange={handleChangeInput_MenuImgUrl} required placeholder="" />
        <label>설명</label>
        <input type="textarea" name='description' value={input_Menu.description} onChange={handleChangeInput_Menu} placeholder=""/>
        
        <button type="submit">메뉴 추가</button>
      </form>
      {input_MenuPreviewImg && (
      <img
        alt={input_MenuImgUrl}
        src={input_MenuPreviewImg}
        accept="image/*"
        style={{ margin: "auto" }}
      />
      )} 
      */}
    </>
  )
}

export default AdminAddMenu