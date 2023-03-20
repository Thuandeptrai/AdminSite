import { Mail, Home, Circle, FileText, DollarSign, User } from "react-feather"

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home"
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page"
  },
  {
    id: "managerUser",
    title: "Quản lí nhân sự",
    icon: <User size={20} />,
    navLink: "/UserView"
  },

  {
    id: "TotalWork In Month",
    title: "Quản Lý Lương",
    icon: <DollarSign size={20} />,
    navLink: "/ABc"
  },
  {
    id: "timesheet",
    title: "Quản lí lịch làm việc",
    icon: <FileText size={20} />,
    navLink: "/timesheet"
  },
  {
    id: "ngayCong",
    title: "Quản lí Ngay Cong",
    icon: <FileText size={20} />,
    navLink: "/dateWork"
  }
]
