// ** React Imports
import { Navigate } from 'react-router-dom'
import { useContext, Suspense } from 'react'

// ** Context Imports
import { AbilityContext } from '@src/utility/context/Can'

// ** Spinner Import
import Spinner from '../spinner/Loading-spinner'

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const user = JSON.parse(localStorage.getItem('userData'))

  if (route) {
    let restrictedRoute = false

    if (route.meta) {
      restrictedRoute = route.meta.restricted
    }
    if (!user) {
      return <Navigate to='/login' />
    }
  
    if (user && restrictedRoute) {
      return <Navigate to='/access-control' />
    }
   
  }

  return <Suspense fallback={<Spinner className='content-loader' />}>{children}</Suspense>
}

export default PrivateRoute
