import { ReactNode } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  box-sizing: border-box;
  background-color: #000;
  height: 100vh;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨김 */
  }
`;

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <PageContainer>{children}</PageContainer>;
};

export default AuthLayout;
