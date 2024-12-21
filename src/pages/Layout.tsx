import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../widgets/client/Header";
import Sidebar from "../widgets/client/Sidebar";
import MainContainer from "../widgets/client/MainContainer";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-y: hidden;

  background-color: #000;
`;

const Layout = () => {
  const [navShow, setNavShow] = useState(false);

  const handleScroll = (scrollTop: number) => {
    if (scrollTop > 30) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
  };

  return (
    <Wrapper>
      <Header $navShow={navShow} />
      <Sidebar />
      <MainContainer onScroll={handleScroll}>
        <Outlet />
      </MainContainer>
    </Wrapper>
  );
};

export default Layout;
