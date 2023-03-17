// ** Router imports
import { useLocation, useNavigate, useRoutes } from "react-router-dom"

// ** GetRoutes
import { getRoutes } from "./routes"

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout"
import { atom, useAtom } from "jotai"
import { userAtom } from "../App"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getUserForVerify } from "../views/user/store"


const Router = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // ** Hooks
  dispatch(getUserForVerify())

  
  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)
  const routes = useRoutes([...allRoutes])


  return routes
}

export default Router
