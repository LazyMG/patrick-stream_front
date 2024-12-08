import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";
import PlayBar from "./PlayBar";

const Wrapper = styled.div`
  margin-left: 250.5px;
  background: radial-gradient(circle at top left, #0a262e 3%, #0a0a0a 20%);
  min-height: 100vh;
  background-attachment: local;

  /* display: flex;
  justify-content: center;
  align-items: center; */
  overflow-y: auto;

  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  /* 화면 너비에 따라 패딩을 다르게 설정 */
  @media (max-width: 2800px) {
    padding: 0 18%; /* 화면이 1200px 이하일 때 패딩을 6%로 설정 */
  }

  @media (max-width: 1800px) {
    padding: 0 8%; /* 화면이 1200px 이하일 때 패딩을 6%로 설정 */
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 60px;
  color: white;
  box-sizing: border-box;
  /* background-color: aquamarine; */
`;

const ConentContainer = styled.div`
  width: 100%;
  margin-top: 100px;
`;

const Footer = styled.div`
  width: 100%;
  height: 80px;
`;

// Youtube 여기에 넣기

interface IMainContainer {
  children: ReactNode;
  onScroll: (scrollTop: number) => void;
}

const MainContainer = ({ children, onScroll }: IMainContainer) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        onScroll(wrapperRef.current.scrollTop);
      }
    };

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener("scroll", handleScroll);

    return () => {
      wrapper?.removeEventListener("scroll", handleScroll);
    };
  }, [onScroll]);

  return (
    <Wrapper ref={wrapperRef}>
      <Content>
        <ConentContainer>{children}</ConentContainer>
        <Footer />
      </Content>
      <PlayBar />
    </Wrapper>
  );
};

export default MainContainer;
