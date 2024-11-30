import { ReactNode } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 100px;
`;

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <PageContainer>{children}</PageContainer>;
};

export default AuthLayout;
