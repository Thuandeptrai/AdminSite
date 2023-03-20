import { Table } from "antd";
import React from "react";
const ResultTable = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];
  const columns = [

    {
      title: "STT",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mã số nhân viên",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return <Table dataSource={dataSource} columns={columns} />;
};
export default ResultTable;
