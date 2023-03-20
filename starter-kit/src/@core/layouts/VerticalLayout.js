// ** React Imports
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux"
import {
  handleMenuCollapsed,
  handleContentWidth,
  handleMenuHidden
} from "@store/layout"

// ** Third Party Components
import Select from "react-select"

import classnames from "classnames"
import { ArrowUp, Check, Briefcase, X } from "react-feather"

// ** Reactstrap Imports
import {
  Navbar,
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader
} from "reactstrap"

// ** Configs
import themeConfig from "@configs/themeConfig"

import moment from "moment"
// ** Custom Components

import Customizer from "@components/customizer"
import ScrollToTop from "@components/scrolltop"
import FooterComponent from "./components/footer"
import NavbarComponent from "./components/navbar"
import SidebarComponent from "./components/menu/vertical-menu"
import { useForm, Controller } from "react-hook-form"

// ** Custom Hooks
import { useRTL } from "@hooks/useRTL"
import { useSkin } from "@hooks/useSkin"

import { useLayout } from "@hooks/useLayout"
import { useNavbarType } from "@hooks/useNavbarType"
import { useFooterType } from "@hooks/useFooterType"
import { useNavbarColor } from "@hooks/useNavbarColor"

// ** Styles
import "@styles/base/core/menu/menu-types/vertical-menu.scss"
import "@styles/base/core/menu/menu-types/vertical-overlay-menu.scss"
import { checkInForUser, checkOutForUser } from "../../utility/api/checkDay"

const VerticalLayout = (props) => {
  // ** Props
  const { menu, navbar, footer, children, menuData } = props
  const getCurrentUser = useSelector((state) => state.userApp.currentUser)
  // ** Hooks
  const [isRtl, setIsRtl] = useRTL()
  const { skin, setSkin } = useSkin()
  const { navbarType, setNavbarType } = useNavbarType()
  const { footerType, setFooterType } = useFooterType()
  const { navbarColor, setNavbarColor } = useNavbarColor()
  const { layout, setLayout, setLastLayout } = useLayout()

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [Time, setTime] = useState(moment().format("DD/MM/YY"))
  const [currentHour, setCurrentHour] = useState(moment().format("HH:mm:ss"))
  const [show, setShow] = useState(true)

  useEffect(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = () => {
    setShow(false)
  }
  // ** Vars
  const dispatch = useDispatch()
  const layoutStore = useSelector((state) => state.layout)

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }
  const { control, field, setError, handleSubmit } = useForm({
    defaultValues: {}
  })

  // ** Vars
  const location = useLocation()
  const isHidden = layoutStore.menuHidden
  const contentWidth = layoutStore.contentWidth
  const menuCollapsed = layoutStore.menuCollapsed

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = (val) => dispatch(handleMenuCollapsed(val))

  // ** Handles Content Width
  const setContentWidth = (val) => dispatch(handleContentWidth(val))

  // ** Handles Content Width
  const setIsHidden = (val) => dispatch(handleMenuHidden(val))

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location])

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleWindowWidth)
    }
  }, [windowWidth])

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format("DD/MM/YY"))
      setCurrentHour(moment().format("hh:mm:ss"))
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])
  // ** Vars
  const footerClasses = {
    static: "footer-static",
    sticky: "footer-fixed",
    hidden: "footer-hidden"
  }

  const navbarWrapperClasses = {
    floating: "navbar-floating",
    sticky: "navbar-sticky",
    static: "navbar-static",
    hidden: "navbar-hidden"
  }

  const navbarClasses = {
    floating:
      contentWidth === "boxed" ? "floating-nav container-xxl" : "floating-nav",
    sticky: "fixed-top",
    static: "navbar-static-top",
    hidden: "d-none"
  }

  const bgColorCondition =
    navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white"

  if (!isMounted) {
    return null
  }
  const statusOptions = [
    { value: "active", label: "Check In" },
    { value: "inactive", label: "Check Out" }
  ]
  const onSubmit = async (data) => {
    console.log(data.Mode)
    if (data.Mode.value === "active") {
      await checkInForUser()
    } else {
      await checkOutForUser()
      
    }
    setShow(false)
    if (Object.values(data).every((field) => field.length > 0)) {

      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
    }
  }
  return (
    <>
      <Modal isOpen={show} className="modal-dialog-centered modal-lg">
        <ModalHeader className="bg-transparent"></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Xác Nhận Chấm Công</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Tên:
                </Label>
                <Input
                  defaultValue={getCurrentUser?.name}
                  type="email"
                  id="lastName"
                  disabled
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lastName">
                  Mã Số Nhân Viên:
                </Label>
                <Input
                  defaultValue={getCurrentUser?.employeeNumber}
                  type="email"
                  id="lastName"
                  disabled
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className="form-label" for="username">
                  Ngày
                </Label>
                <Input
                  id=""
                  placeholder="Tax-1234"
                  defaultValue={Time}
                  value={Time}
                  disabled
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="billing-email">
                  Giờ Hiện Tại
                </Label>
                <Input
                  id=""
                  placeholder="Tax-1234"
                  defaultValue={currentHour}
                  value={currentHour}
                  disabled
                />
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="status">
                  Chọn Kiểu:
                </Label>
                <Controller
                  control={control}
                  name={"Mode"}
                  defaultValue={statusOptions[0]}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Select
                      options={statusOptions}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={statusOptions.find(
                        (option) => option.value === value
                      )}
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col xs={12} className="tePxt-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Xác Nhận
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleCloseModal(false)
                  }}
                >
                  Xóa
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <div
        className={classnames(
          `wrapper vertical-layout ${
            navbarWrapperClasses[navbarType] || "navbar-floating"
          } ${footerClasses[footerType] || "footer-static"}`,
          {
            // Modern Menu
            "vertical-menu-modern": windowWidth >= 1200,
            "menu-collapsed": menuCollapsed && windowWidth >= 1200,
            "menu-expanded": !menuCollapsed && windowWidth > 1200,

            // Overlay Menu
            "vertical-overlay-menu": windowWidth < 1200,
            "menu-hide": !menuVisibility && windowWidth < 1200,
            "menu-open": menuVisibility && windowWidth < 1200
          }
        )}
        {...(isHidden ? { "data-col": "1-column" } : {})}
      >
        {!isHidden ? (
          <SidebarComponent
            skin={skin}
            menu={menu}
            menuData={menuData}
            menuCollapsed={menuCollapsed}
            menuVisibility={menuVisibility}
            setMenuCollapsed={setMenuCollapsed}
            setMenuVisibility={setMenuVisibility}
          />
        ) : null}

        <Navbar
          expand="lg"
          container={false}
          light={skin !== "dark"}
          dark={skin === "dark" || bgColorCondition}
          color={bgColorCondition ? navbarColor : undefined}
          className={classnames(
            `header-navbar navbar align-items-center ${
              navbarClasses[navbarType] || "floating-nav"
            } navbar-shadow`
          )}
        >
          <div className="navbar-container d-flex content">
            {navbar ? (
              navbar({ skin, setSkin, setMenuVisibility })
            ) : (
              <NavbarComponent
                setMenuVisibility={setMenuVisibility}
                skin={skin}
                setSkin={setSkin}
              />
            )}
          </div>
        </Navbar>
        {children}

        {/* Vertical Nav Menu Overlay */}
        <div
          className={classnames("sidenav-overlay", {
            show: menuVisibility
          })}
          onClick={() => setMenuVisibility(false)}
        ></div>
        {/* Vertical Nav Menu Overlay */}

        {themeConfig.layout.customizer === true ? (
          <Customizer
            skin={skin}
            isRtl={isRtl}
            layout={layout}
            setSkin={setSkin}
            setIsRtl={setIsRtl}
            isHidden={isHidden}
            setLayout={setLayout}
            footerType={footerType}
            navbarType={navbarType}
            setIsHidden={setIsHidden}
            themeConfig={themeConfig}
            navbarColor={navbarColor}
            contentWidth={contentWidth}
            setFooterType={setFooterType}
            setNavbarType={setNavbarType}
            setLastLayout={setLastLayout}
            menuCollapsed={menuCollapsed}
            setNavbarColor={setNavbarColor}
            setContentWidth={setContentWidth}
            setMenuCollapsed={setMenuCollapsed}
          />
        ) : null}
        <footer
          className={classnames(
            `footer footer-light ${
              footerClasses[footerType] || "footer-static"
            }`,
            {
              "d-none": footerType === "hidden"
            }
          )}
        >
          {footer ? (
            footer
          ) : (
            <FooterComponent
              footerType={footerType}
              footerClasses={footerClasses}
            />
          )}
        </footer>

        {themeConfig.layout.scrollTop === true ? (
          <div className="scroll-to-top">
            <ScrollToTop showOffset={300} className="scroll-top d-block">
              <Button className="btn-icon" color="primary">
                <ArrowUp size={14} />
              </Button>
            </ScrollToTop>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default VerticalLayout
