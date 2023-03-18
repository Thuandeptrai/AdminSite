import React, { useState } from "react";
import { Button, Form, Input, Row, Col, Select } from "antd";
import { useParams } from "react-router-dom";
const AddEditUser = () => {
  const { handle, id } = useParams();
  console.log("useParams:", useParams());
  const [departmentValue, setDepartmentValue] = useState({
    value: "it",
    label: "IT",
  });
  const [positionValue, setPositionValue] = useState({
    value: "nhanvien",
    label: "Nhân viên",
  });
  const positionOptions = [
    {
      value: "nhanvien",
      label: "Nhân viên",
    },
    {
      value: "leader",
      label: "Leader",
    },
    {
      value: "Admin",
      label: "Admin",
    },
  ];
  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={16}>
          <Col span="8">
            <Row>
              <Col span="24">
                <Form.Item
                  label="Họ tên"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Mã số nhân viên"
                  name="employeeNumber"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Phòng ban"
                  name="department"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Select defaultValue={departmentValue}>
                    <Select.Option value="it">IT</Select.Option>
                    <Select.Option value="seo">SEO</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span="8">
            <Row>
              <Col span="24">
                <Form.Item
                  label="Chức vụ"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Select
                    defaultValue={positionValue}
                    options={positionOptions}
                  />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Số điện thoại"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Email"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span="8">
            <Row>
              <Col span="24">
                <Form.Item
                  label="Ngân hàng"
                  name="bank"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Số tiền khoản"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Mức lương"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddEditUser;
