import { Button, Col, Form, Input, InputNumber, Row } from 'antd'
import React from 'react'

const SetTableNumber = () => {
  const [ form ] = Form.useForm();
  const onFinish = (value) => {
    console.log(value['tableNumber'])
  }
  return (
    <div>
      <h2>테이블 수 설정</h2>
      <Form 
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout='horizontal'
        form={form}
        onFinish={onFinish}
        initialValues={{remember: true,}}
      >        
        <Form.Item label="테이블수"  name={"tableNumber"}>
          <InputNumber style={{width: '100%',}}/>
        </Form.Item>   
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
    </div>
  )
}

export default SetTableNumber