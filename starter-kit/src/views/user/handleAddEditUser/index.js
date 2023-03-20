import React, { useState, useEffect } from "react";
import { Button, Form, Input, Row, Col, Select, message } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUser } from "./../store/index";
import { ListBanks } from "../../../utility/common/listBank";
import { updateUser } from "../../../utility/api/user";

const AddEditUser = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { handle, id } = useParams();
  const [departmentValue, setDepartmentValue] = useState({
    value: "it",
    label: "IT",
  });
  const [bankNameValue, setBankNameValue] = useState({
    value: ListBanks[0]?.short_name,
  });
  const [positionValue, setPositionValue] = useState({
    value: "False",
    label: "Nhân viên",
  });
  const positionOptions = [
    {
      value: "False",
      label: "Nhân viên",
    },
    {
      value: "True",
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
    // return;

    if (id === "new") {
      const rs = await dispatch(addUser(value));
      if (rs?.payload) {
        message.success("Tạo thành công");
      }
    } else {
      const rs = await updateUser(value?.id, value);
      if (rs?.statusText === "OK") {
        message.success("Cập nhật thành công");
      }
    }
  };
  useEffect(() => {
    if (id !== "new") {
      getUserDataDetail();
    } else {
      form.setFieldsValue({
        department: departmentValue,
        isAdmin: positionValue,
        bankName: bankNameValue,
      });
    }
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
              <Col span="24" disabled>
                <Form.Item label="id" name="id" hidden={true}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Họ tên"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên nhân viên!",
                    },
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
                    {
                      required: true,
                      message: "Vui lòng nhập mã số nhân viên!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item label="Phòng ban" name="department">
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
                <Form.Item label="Chức vụ" name="isAdmin">
                  <Select
                    defaultValue={positionValue}
                    options={positionOptions}
                  />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Số điện thoại"
                  name="phonenumber"
                  rules={[
                    { required: true, message: "Vui lòng điền số điện thoại!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Vui lòng điền email" }]}
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
                  name="bankName"
                  rules={[
                    { required: true, message: "Vui lòng chọn ngân hàng!" },
                  ]}
                >
                  {/* <Input />
                   */}
                  <Select>
                    {ListBanks?.map((item) => (
                      <option key={item?.bin} value={item?.short_name}>
                        {item?.short_name} - {item?.name}
                      </option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Số tài khoản"
                  name="userBankNumber"
                  rules={[
                    { required: true, message: "Vui lòng nhập số tài khoản!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="24">
                <Form.Item
                  label="Mức lương"
                  name="salary"
                  rules={[
                    { required: true, message: "Vui lòng chọn mức lương" },
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
            {id === "new" ? "Thêm" : "Cập nhật"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default AddEditUser;
