import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, Select } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./../store/index";
const AddEditUser = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.userApp.selectedUser);
  console.log("store:", store);
  const [form] = Form.useForm();
  const { handle, id } = useParams();
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
  const getUserDataDetail = async () => {
    const rs = await dispatch(getUser(id));
    const data = rs.payload;
    form.setFieldsValue({
      ...data,
    });
  };
  const onFinish = async (value) => {
    console.log("value:", value);
  };
  useEffect(() => {
    if (id !== "new") getUserDataDetail();
  }, [id]);
  return (
    <>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
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
                  name="email"
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
