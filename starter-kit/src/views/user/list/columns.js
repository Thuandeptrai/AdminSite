// ** React Imports
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";
import { getUser, deleteUser } from "../store";

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";
import { message } from "antd";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Renders Client Columns
const renderClient = (row) => {
  if (row.length) {
    return <Avatar className="me-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.avatarColor || "light-primary"}
        content={row.fullName || "John Doe"}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    subscriber: {
      class: "text-primary",
      icon: User,
    },
    maintainer: {
      class: "text-success",
      icon: Database,
    },
    editor: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      {row.isAdmin === "True" ? "Admin" : "Nhân viên"}
    </span>
  );
};
//delete user

const onDeleteHandle = async (id) => {
  const rs = await store.dispatch(deleteUser(id));
  console.log("rs:", rs);
  if (rs?.meta?.requestStatus === "fulfilled") {
    message.success("Thành công");
  }else{
    message.error("Có lỗi xảy ra");

  }
};
const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};
export const columns = [
  {
    name: "Email",
    sortable: true,
    minWidth: "250px",
    sortField: "Email",
    selector: (row) => row.fullName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.fullName}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },
  {
    name: "Cấp bậc",
    sortable: true,
    minWidth: "82px",
    sortField: "role",
    selector: (row) => row.role,
    cell: (row) => renderRole(row),
  },
  {
    name: "MSNV",
    minWidth: "100px",
    sortable: true,
    sortField: "currentPlan",
    selector: (row) => row.employeeNumber,
    cell: (row) => (
      <span className="text-capitalize">{row.employeeNumber}</span>
    ),
  },
  {
    name: "Phòng ban",
    minWidth: "100px",
    sortable: true,
    sortField: "billing",
    selector: (row) => row.department,
    cell: (row) => <span className="text-capitalize">{row.department}</span>,
  },
  // {
  //   name: "Trạng Thái",
  //   minWidth: "100px",
  //   sortable: true,
  //   sortField: "status",
  //   selector: (row) => row.status,
  //   cell: (row) => <span className="text-capitalize">{row.status}</span>,
  // },
  {
    name: "Mức Lương",
    minWidth: "100px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.salary,
    cell: (row) => <span className="text-capitalize">{row.salary}</span>,
  },
  {
    name: "Ngân Hàng",
    minWidth: "100px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.bankName,
    cell: (row) => <span className="text-capitalize">{row.bankName}</span>,
  },
  {
    name: "Số Điện Thoại",
    minWidth: "100px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.phonenumber,
    cell: (row) => <span className="text-capitalize">{row.phonenumber}</span>,
  },
  {
    name: "Hành Động",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/UserView/${row.id}`}
              onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">Chi tiết</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">Chỉnh sửa</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                onDeleteHandle(row.id);

                // store.dispatch(deleteUser(row.id));
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">Xóa</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
