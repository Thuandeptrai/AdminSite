import React, { Suspense } from "react"
import { Provider, atom  } from "jotai"

// ** Router Import
import Router from "./router/Router"
import { getCurrentUser } from "./utility/api/user"

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
  return (
    <Provider>

    <Suspense fallback={null}>
      <Router />
    </Suspense>
    </Provider>
  )
}

export default App
