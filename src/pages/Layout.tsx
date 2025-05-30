import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../widgets/client/layout/Header";
import Sidebar from "../widgets/client/layout/Sidebar";
import MainContainer from "../widgets/client/layout/MainContainer";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-y: auto;

  background-color: #000;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨김 */
  }
`;

const Layout = () => {
  const [navShow, setNavShow] = useState(false);
  const [isSideBarChange, setIsSideBarChange] = useState<boolean>(false);

  const handleScroll = (scrollTop: number) => {
    if (scrollTop > 30) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
  };

  return (
    <>
      <Wrapper>
        <Header
          $navShow={navShow}
          setIsSideBarChange={setIsSideBarChange}
          isSideBarChange={isSideBarChange}
        />
        <Sidebar isSideBarChange={isSideBarChange} />
        <MainContainer
          onScroll={handleScroll}
          isSideBarChange={isSideBarChange}
        >
          <Outlet />
        </MainContainer>
      </Wrapper>
    </>
  );
};

export default Layout;
