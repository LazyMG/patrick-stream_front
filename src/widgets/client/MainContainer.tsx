import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 250.5px;
  /* margin-top: 80px; */
  background: radial-gradient(circle at top left, #0a262e 3%, #0a0a0a 20%);
  height: 100%;
  background-attachment: local;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12%;
  overflow-y: auto;

  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 80px;
  /* height: 500vh; */
  display: flex;
  justify-content: center;
  color: white;
  box-sizing: border-box;
  /* background-color: aquamarine; */
`;

const ConentContainer = styled.div`
  width: 100%;
  padding-top: 50px;
`;

const Playbar = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100vw;

  display: none;
  /* background-color: chartreuse; */
`;

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
      </Content>
      <Playbar />
    </Wrapper>
  );
};

export default MainContainer;
