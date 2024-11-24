import { RouterProvider } from "react-router-dom"
import GlobalStyle from "../GlobalStyle"
import router from "../routes/route"

const GlobalRouterProvider = () => {
  return (
    <>
      <GlobalStyle/>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default GlobalRouterProvider