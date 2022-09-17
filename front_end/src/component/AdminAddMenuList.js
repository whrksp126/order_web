import React from 'react'
import axios from 'axios';
import { Button, Col, Form, Input, Row, message } from 'antd';

import { Colorpicker } from 'antd-colorpicker'

const AdminAddMenuList = () => {

  const [ form ] = Form.useForm();

  const onFinish = (values) => {
    const input_List = {
      name: values.name,
      description: values.description,
      color: values.color.hex,
    }
    axios.post("/admin/add_list", input_List)
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
      <h2>리스트 추가</h2>
      <Form 
        onFinish={onFinish} 
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout='horizontal'
        form={form}
      >
        <Form.Item label="리스트명" name={"name"}>
          <Input />
        </Form.Item>
        <Form.Item label="설명" name={"description"}>
          <Input />
        </Form.Item>
        <Form.Item label={'리스트 색상'} name={'color'}>
          <Colorpicker picker='SwatchesPicker'
            onColorResult={(color) => color}
            popup 
            blockStyles={{
              width: '100%',
              height: '30px',
          }}/>
        </Form.Item>
        <Form.Item >
          <Row>
            <Col >
              <Button  type="primary"  htmlType={"submit"}>
                리스트 추가
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  )
}

export default AdminAddMenuList