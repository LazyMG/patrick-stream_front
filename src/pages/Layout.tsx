import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../widgets/client/layout/Header";
import Sidebar from "../widgets/client/layout/Sidebar";
import MainContainer from "../widgets/client/layout/MainContainer";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-y: auto;

  /* background-color: #000; */

  background-color: blue;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Layout = () => {
  const [navShow, setNavShow] = useState(false);

  const [isSideBarChange, setIsSideBarChange] = useState<boolean>(false); // true: 큰, false: 중간
  const [isOverlayOpen, setOverlayOpen] = useState(false);

  const handleScroll = (scrollTop: number) => {
    if (scrollTop > 20) {
      setNavShow(true);
    } else {
      setNavShow(false);
    }
  };

  const handleHamburgerClick = () => {
    const width = window.innerWidth;

    if (width <= 940) {
      setOverlayOpen(true);
    } else {
      setIsSideBarChange((prev) => !prev);
    }
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 940 && isOverlayOpen) {
        setOverlayOpen(false); // 오버레이 자동 닫기
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOverlayOpen]);

  return (
    <>
      <Wrapper>
        <Header
          $navShow={navShow}
          setIsSideBarChange={setIsSideBarChange}
          isSideBarChange={isSideBarChange}
          onHamburgerClick={handleHamburgerClick}
        />
        <Sidebar isSideBarChange={isSideBarChange} />
        <Sidebar
          isSideBarChange={false}
          isOverlay
          visible={isOverlayOpen}
          onClose={handleCloseOverlay}
        />
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
