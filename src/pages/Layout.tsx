import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../widgets/client/Header";
import Sidebar from "../widgets/client/Sidebar";
import MainContainer from "../widgets/client/MainContainer";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: cadetblue;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-y: hidden;
`;

const Layout = () => {
  return (
    <Wrapper>
      <Header />
      <Sidebar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </Wrapper>
  );
};

export default Layout;
