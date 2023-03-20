import { Button, Modal, Form, Col, Row } from "antd"
import { useState, useEffect } from "react"
import { Input } from "reactstrap"
import ResultTable from "./ResultTable/index"
import { getDateToCheck } from "../../utility/api/dateToCheck"

const TimeSheet = () => {
  const [date, setDate] = useState([])
  const getDate = async () => {
    const rs = await getDateToCheck()
    setDate(rs?.data?.data)
  }
  useEffect(() => {
    getDate()
  }, [])
  return (
    <>
      <ResultTable data={date} />
    </>
  )
}
export default TimeSheet
