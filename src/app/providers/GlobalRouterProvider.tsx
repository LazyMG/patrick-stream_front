import { RouterProvider } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import router from "../routes/route";
import { RecoilRoot } from "recoil";

const GlobalRouterProvider = () => {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <RouterProvider router={router}></RouterProvider>
      </RecoilRoot>
    </>
  );
};

export default GlobalRouterProvider;
