import { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: 250px;
  margin-top: 80px;
  /* background-color: coral; */
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12%;
  overflow-y: auto;

  position: relative;
`;

const Content = styled.div`
  width: 100%;
  /* height: 100vh; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aquamarine;
`;

const Playbar = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100vw;
  /* background-color: chartreuse; */
`;

interface IMainContainer {
  children: ReactNode;
}

const MainContainer = ({ children }: IMainContainer) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
      <Playbar />
    </Wrapper>
  );
};

export default MainContainer;
