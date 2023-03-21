import { Table } from "antd"
import DataTable from "react-data-table-component"
import React from "react"
import ExampleModal from "./../modal/index"
import { useSelector } from 'react-redux'
const ResultTable = ({ data, getDate }) => {
const currentUser = useSelector(state => state.userApp.currentUser)
console.log("daaata:", data)
  const handleEdit = (id) => {}
  const columns = [
    {
      name: "Thời gian bắt đầu làm việc",
      selector: "dateIn"
    },
    {
      name: "Thời gian kết thúc làm việc",
      selector: "dateOut"
    },
    {
      name: "Thời gian cho phép đi trễ",
      selector: "lateDate"
    },
    {
      name: "Thời gian bắt đầu nghĩ trưa",
      selector: "leisureTimeStart"
    },
    {
      name: "Thời gian kết thúc nghĩ trưa",
      selector: "leisureTimeEnd"
    },
    {
      name: "Hành động",
      cell: (row) => {
        console.log("row:", row)
        return (
          <div>
            {/* <button
             onClick={() => handleEdit(row?._id)}>Edit</button> */}
             {currentUser.isAdmin === "True" ? <ExampleModal data={row} getDate={getDate} /> : null }           </div>
        )
      }
    }
  ]
  // return <Table dataSource={data} columns={columns} />
  return <DataTable columns={columns} data={data} />
}
export default ResultTable
