// ** React Imports
import { Fragment, useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions
import { getAllData, getData, getUserForVerify } from "../store";
import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(store.data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }
  // Invoke when user click to request another page.

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">Hiển thị</label>
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
            <label htmlFor="rows-per-page">kết quả</label>
          </div>
        </Col>
        <Col
          xl="6"
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

          <div className="d-flex align-items-center table-header-actions">
            {/* <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <Printer className="font-small-4 me-50" />
                  <span className="align-middle">Print</span>
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => downloadCSV(store.data)}
                >
                  <FileText className="font-small-4 me-50" />
                  <span className="align-middle">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid className="font-small-4 me-50" />
                  <span className="align-middle">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy className="font-small-4 me-50" />
                  <span className="align-middle">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
            <Link to="/user/add/new">
              <Button
                className="add-new-user"
                color="primary"
                // onClick={toggleSidebar}
                // onClick={onClickHandle}
              >
                Add New User
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.userApp.data);
  // ** States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({
    value: "",
    label: "Tất cả",
  });
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "Tất cả",
  });

  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "Tất cả",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "Select Status",
    number: 0,
  });
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // ** Get data on mount
  // useEffect(() => {
  //   dispatch(getAllData());
  //   dispatch(getData());
  // }, []);
  const [sort, setSort] = useState({ field: "name", direction: "desc" });

  // ** User filter options
  const roleOptions = [
    { value: "", label: "Tất cả" },
    { value: "True", label: "Admin" },
    { value: "False", label: "Nhân viên" },
  ];

  const departmentOptions = [
    {
      value: "",
      label: "Tất cả",
    },
    {
      value: "seo",
      label: "SEO",
    },
    {
      value: "it",
      label: "IT",
    },
  ];
  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  const statusOptions = [
    { value: "", label: "Select Status", number: 0 },
    { value: "pending", label: "Pending", number: 1 },
    { value: "active", label: "Active", number: 2 },
    { value: "inactive", label: "Inactive", number: 3 },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    dispatch(getData());
    setCurrentPage(page.selected + 1);
  };
  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value,
      })
    );
    setRowsPerPage(value);
  };
  useEffect(() => {
    dispatch(
      getData({
        q: searchTerm,
        role: currentRole.value,
        department: currentDepartment.value,
      })
    );
  }, [searchTerm, currentRole, currentDepartment]);
  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    console.log(currentStatus);
    dispatch(
      getData({
        //sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
        // status: currentStatus.value,
        // page: currentPage,
        // perPage: rowsPerPage,
        // role: currentRole.value,
        // status: currentStatus.value
      })
    );
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.length / rowsPerPage));

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
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: currentRole.value,
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value,
      })
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">Tìm kiếm</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {/* <Col md="4">
              <Label for="">Họ và tên</Label>
              <Input />
            </Col> */}
            {/* <Col md="4">
              <Label for="">Phòng ban</Label>
              <Select
                // value={currentDepartment}
                options={departmentOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
              />
            </Col> */}
            {/* <Col md="4">
              <Label for="role-select">Chức vụ</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(getData({}));
                }}
              />
            </Col> */}
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">Phòng ban</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                // options={planOptions}
                options={departmentOptions}
                value={currentDepartment}
                onChange={(data) => {
                  setCurrentDepartment(data);
                  dispatch(getData({}));
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">Chức vụ</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={roleOptions}
                value={currentRole}
                onChange={(data) => {
                  setCurrentRole(data);
                  dispatch(getData({}));
                }}
              />
            </Col>
            {/* <Col md="4">
              <Label for="status-select">Status</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                  dispatch(getData({}));
                }}
              />
            </Col> */}
          </Row>
          {/* <Row style={{ marginTop: "1rem" }}>
            <Col md="4">
              <Button className="add-new-user btn btn-primary">
                {" "}
                Tìm kiếm
              </Button>
            </Col>
          </Row> */}
        </CardBody>
      </Card>

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
            data={store.length !== undefined ? store : [store]}
            subHeaderComponent={
              <CustomHeader store={store} handleFilter={handleFilter} />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} />
    </Fragment>
  );
};

export default UsersList;
