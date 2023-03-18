// ** React Imports
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'
import { useSelector } from 'react-redux'
const PublicRoute = ({ children, route }) => {
  const users = useSelector(state => state.userApp.currentUser)
 
  console.log(users)
  if (route) {
    const restrictedRoute = route.meta && route.meta.restricted

    if (users && restrictedRoute) {
    return <Navigate to={getHomeRouteForLoggedInUser(user)} />
    }
    if (users && route.path === '/login') {
      return <Navigate to={"/home"} />
    }
    if (!users && route.path === '/home') {
      return <Navigate to={"/login"} />
    }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PublicRoute
