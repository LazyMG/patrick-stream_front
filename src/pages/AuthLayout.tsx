import { ReactNode } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  box-sizing: border-box;
  background-color: #000;
  width: 100vw;
  height: 100vh;
`;

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <PageContainer>{children}</PageContainer>;
};

export default AuthLayout;
