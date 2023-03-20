import { Col, Row } from "antd";
import React from "react";
import ResultTable from "./ResultTable/index";
const TimeSheet = () => {
  return (
    <>
      <Row>
        <Col span="24"></Col>
        <Col span="24">
            <h1 style={{textAlign:"center"}}>Bảng chấm công ngày 20/03/2023</h1>
        </Col>
        <Col span="24">
          <ResultTable />
        </Col>
      </Row>
    </>
  );
};
export default TimeSheet;
