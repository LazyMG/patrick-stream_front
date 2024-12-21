import { RouterProvider } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import router from "../routes/route";
import { useAuth } from "../../shared/hooks/useAuth";

const GlobalRouterProvider = () => {
  useAuth();
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default GlobalRouterProvider;
