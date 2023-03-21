import { auto } from "@popperjs/core"
import React, { useState } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap"
import { updateDateToCheck } from "../../../utility/api/dateToCheck"
import { message } from "antd"
import { useSelector } from 'react-redux'
const ExampleModal = ({ data, getDate }) => {
const currentUser = useSelector(state => state.userApp.currentUser)
  const [startHour, setStartHour] = useState("")
  const [startMinute, setStartMinute] = useState("")
  const [endHour, setEndHour] = useState("")
  const [endMinute, setEndMinute] = useState("")
  //Nghĩ trưa
  const [startHourNghiTrua, setStartHourNghiTrua] = useState("")
  const [startMinuteNghiTrua, setStartMinuteNghiTrua] = useState("")
  const [endHourNghiTrua, setEndHourNghiTrua] = useState("")
  const [endMinuteNghiTrua, setEndMinuteNghiTrua] = useState("")
  //
  //cho phep di tre
  const [startHourDiTre, setStartHourDiTre] = useState("")
  const [startMinuteDiTre, setStartMinuteDiTre] = useState("")
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  const handleSave = () => {
    toggle()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const dateIn = `${startHour}:${startMinute}` //bắt đầu làm việc
    const dateOut = `${endHour}:${endMinute}` //kết thúc
    const lateDate = `${startHourDiTre}:${startMinuteDiTre}` //di trễ
    const leisureTimeStart = `${startHourNghiTrua}:${startMinuteNghiTrua}` //bắt đầu nghĩ trưa
    const leisureTimeEnd = `${endHourNghiTrua}:${endMinuteNghiTrua}` //kết thúc nghiuax trưa
    const resData = {
      dateIn,
      dateOut,
      lateDate,
      leisureTimeStart,
      leisureTimeEnd
    }
    const rs = await updateDateToCheck(data?._id, resData)
    if (rs?.statusText === "OK") {
      message.success("Cập nhật thành công")
      setModal(!modal)
      getDate()
    } else {
      message.error("Có lỗi xảy ra")
    }
  }
  console.log(currentUser.isAdmin)
  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Chỉnh sửa
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Chỉnh sửa</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md="6" style={{ marginBottom: "1rem" }}>
                <Label>Thời gian bắt đầu làm việc</Label>
                <div style={{ display: "flex" }}>
                  <Input
                    type="number"
                    name="starhourwork"
                    id="name"
                    onChange={(e) => setStartHour(e.target.value)}
                  />
                  <Input onChange={(e) => setStartMinute(e.target.value)} />
                </div>
              </Col>
              <br />
              <Col md="6">
                <Label>Thời gian kết thúc làm việc</Label>
                <div style={{ display: "flex" }}>
                  <Input onChange={(e) => setEndHour(e.target.value)} />
                  <Input onChange={(e) => setEndMinute(e.target.value)} />
                </div>
              </Col>
              <br />

              <Col md="6" style={{ marginBottom: "1rem" }}>
                <Label>Thời gian bắt đầu nghĩ trưa</Label>
                <div style={{ display: "flex" }}>
                  <Input
                    onChange={(e) => setStartHourNghiTrua(e.target.value)}
                  />
                  <Input
                    onChange={(e) => setStartMinuteNghiTrua(e.target.value)}
                  />
                </div>
              </Col>
              <br />
              <Col md="6">
                <Label>Thời gian kết thúc nghĩ trưa</Label>
                <div style={{ display: "flex" }}>
                  <Input onChange={(e) => setEndHourNghiTrua(e.target.value)} />
                  <Input
                    onChange={(e) => setEndMinuteNghiTrua(e.target.value)}
                  />
                </div>
              </Col>
              <Col md="6">
                <Label>Thời gian cho phép đi trễ</Label>
                <div style={{ display: "flex" }}>
                  <Input onChange={(e) => setStartHourDiTre(e.target.value)} />
                  <Input
                    onChange={(e) => setStartMinuteDiTre(e.target.value)}
                  />
                </div>
              </Col>
              <br />
            </Row>
            {currentUser.isAdmin === "True" ? <Button color="primary" type="submit" style={{ marginTop: "1rem" }}>
              Cập nhật
            </Button> : null}
          </Form>
        </ModalBody>

        <ModalFooter style={{ display: "none" }}>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
export default ExampleModal
