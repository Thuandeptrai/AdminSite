import { Table } from "antd"
import React from "react"
const ResultTable = ({ data }) => {
  console.log("data:", data)

  const columns = [
    {
      title: "Thời gian bắt đầu làm việc",
      dataIndex: "dateIn",
      key: "dateIn"
    },
    {
      title: "Thời gian kết thúc làm việc",
      dataIndex: "dateOut",
      key: "dateOut"
    },
    {
      title: "Thời gian cho phép đi trễ",
      dataIndex: "lateDate",
      key: "lateDate"
    },
    {
      title: "Thời gian bắt đầu nghĩ trưa",
      dataIndex: "leisureTimeStart",
      key: "leisureTimeStart"
    },
    {
      title: "Thời gian kết thúc nghĩ trưa",
      dataIndex: "leisureTimeEnd",
      key: "leisureTimeEnd"
    }
  ]
  return <Table dataSource={data} columns={columns} />
}
export default ResultTable
