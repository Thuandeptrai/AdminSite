// ** Router imports
import { useRoutes } from "react-router-dom"

// ** GetRoutes
import { getRoutes } from "./routes"

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout"
import { useDispatch } from "react-redux"
import { getUserForVerify } from "../views/user/store"

const Router = () => {
  const dispatch = useDispatch()
  // ** Hooks
  dispatch(getUserForVerify())
  //const userData = useSelector(state => state.userApp.currentUser)


  const { layout } = useLayout()

  const allRoutes = getRoutes(layout)

  const routes = useRoutes([...allRoutes])
  return routes
}

export default Router
