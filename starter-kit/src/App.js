import React, { Suspense } from "react"
import { Provider, atom } from "jotai"

// ** Router Import
import RouterApp from "./router/Router"
import { getCurrentUser } from "./utility/api/user"
import { useDispatch } from "react-redux"
import { getUserForVerify } from "./views/user/store"

export const userAtom = atom(async () => {
  const response = await getCurrentUser()
  console.log(response)
  if (response.status === 200) {
    return true
  } else {
    return false
  }
})

const App = () => {
  const dispatch = useDispatch()
  dispatch(getUserForVerify())
  return (
    <Provider>
      <Suspense fallback={null}>
        <RouterApp />
      </Suspense>
    </Provider>
  )
}

export default App
