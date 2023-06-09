// ** User List Component
import Table from "./Table"

// ** Reactstrap Imports
import { Row, Col } from "reactstrap"

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal"

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather"

// ** Styles
import "@styles/react/apps/app-users.scss"
import { useSelector } from "react-redux"

const UsersList = () => {
  const store = useSelector((state) => state.userApp.data)
  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Tổng Nhân viên"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{store.length}</h3>}
          />
        </Col>
        {/* <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col> */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Nhân viên chính thức"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Nhân viên thử việc"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
