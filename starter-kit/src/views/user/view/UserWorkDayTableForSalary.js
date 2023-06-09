// ** React Imports
import { Fragment, useEffect, useState } from "react"

// ** Invoice List Sidebar

// ** Table Columns

// ** Store & Actions
import "flatpickr/dist/flatpickr.min.css"
import { useDispatch, useSelector } from "react-redux"
import { getAllData, getData } from "../store"
// ** Third Party Components
import "flatpickr/dist/themes/material_blue.css"
import DataTable from "react-data-table-component"
import { ChevronDown } from "react-feather"
import ReactPaginate from "react-paginate"

// ** Utils

// ** Reactstrap Imports
import "@styles/react/libs/flatpickr/flatpickr.scss"
import Flatpickr from "react-flatpickr"
import { Card, Col, Input, Row } from "reactstrap"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import { useParams } from "react-router-dom"
import { getSalaryByUserId } from "../../../utility/api/checkDay"
export const columns = [
  {
    name: "Số Ngày Công Chuẩn",
    sortable: true,
    sortField: "date",
    minWidth: "107px",
    selector: (row) => row.rateWorkByMonth
  },
  {
    name: "Số Công Của Bạn",
    sortable: true,
    sortField: "dateIn",
    minWidth: "107px",
    selector: (row) => row.totalWorkInMonth
  },
  {
    name: "Ngày",
    sortable: true,
    sortField: "DateOut",
    minWidth: "107px",
    selector: (row) => `${row.month}/ ${row.year}`
  },
  {
    name: "Mức Lương Chuẩn",
    sortable: true,
    sortField: "DateOut",
    minWidth: "107px",
    selector: (row) => `${new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(row.salaryOfUser)}`
  },
  {
    name: "Tổng Số Giờ",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.totalWorkInMonth
  },
  {
    name: "Tổng Lương",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => `${new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
      }).format(
        (row.salaryOfUser / row.rateWorkByMonth) * row.totalWorkInMonth
      )}`
  }
]
// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm
}) => {
  const [picker, setPicker] = useState(new Date())
  const options = {
    dateFormat: "m-y",
    locale: {
      weekdays: {
        shorthand: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        longhand: [
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
          "Chủ Nhật"
        ]
      },
      months: {
        shorthand: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ],
        longhand: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ]
      }
    }

    // other options
  }
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ","
    const lineDelimiter = "\n"
    const keys = Object.keys(store.data[0])

    result = ""
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach((item) => {
      let ctr = 0
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }
  console.log(picker)

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a")
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = "export.csv"

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute("href", encodeURI(csv))
    link.setAttribute("download", filename)
    link.click()
  }
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="5" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">Entries</label>
          </div>
        </Col>
        <Col
          xl="7"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              Search:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="pickDate">
              Ngày:
            </label>
            <Flatpickr
              id="pickDate"
              value={picker}
              onChange={(date) => setPicker(date)}
              className="form-control invoice-edit-input date-picker"
              options={options}
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UserWorkDayTableSalary = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const { id } = useParams()
  const store = useSelector((state) => state.userApp.data)

  // ** States
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const [sortColumn, setSortColumn] = useState("id")
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userWorkDay, setUserWorkDay] = useState([])

  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Select Role"
  })
  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Select Plan"
  })
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0
  })
  useEffect(
    () => {
      const getUser = async () => {
        const response = await getSalaryByUserId(id)
        setUserWorkDay(response.data.data)
      }
      getUser()
    },
    { id }
  )
  console.log(userWorkDay)
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(getData())
  }, [])
  const [sort, setSort] = useState({ field: "name", direction: "desc" })

  // ** User filter options
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "admin", label: "Admin" },
    { value: "author", label: "Author" },
    { value: "editor", label: "Editor" },
    { value: "maintainer", label: "Maintainer" },
    { value: "subscriber", label: "Subscriber" }
  ]

  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" }
  ]

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 }
  ]

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(getData())
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value
      })
    )
    setRowsPerPage(value)
  }
  useEffect(() => {
    dispatch(
      getData({
        q: searchTerm,
        status: currentStatus.value,
        role: currentRole.value
      })
    )
  }, [currentStatus, searchTerm, currentPlan])
  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val)
    console.log(currentStatus)
    dispatch(
      getData({
        //sort,
        q: val,
        status: currentStatus.value
        // page: currentPage,
        // perPage: rowsPerPage,
        // role: currentRole.value,
        // status: currentStatus.value
      })
    )
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    )
  }

  return (
    <Fragment>
      <div></div>
      <h1 className="mx-auto">Tổng Số Số Giờ Làm Việc Trong Tháng</h1>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            sort={sort}
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={userWorkDay.length !== undefined ? userWorkDay : userWorkDay}
            subHeaderComponent={
              <CustomHeader store={userWorkDay} handleFilter={handleFilter} />
            }
          />
        </div>
      </Card>
    </Fragment>
  )
}

export default UserWorkDayTableSalary
