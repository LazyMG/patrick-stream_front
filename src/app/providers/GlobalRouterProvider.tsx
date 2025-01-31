import { RouterProvider } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";
import router from "../routes/route";
import { useAuth } from "../../shared/hooks/useAuth";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/Theme";

const GlobalRouterProvider = () => {
  useAuth();
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  );
};

export default GlobalRouterProvider;
