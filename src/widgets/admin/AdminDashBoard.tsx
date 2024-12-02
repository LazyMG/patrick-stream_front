import React, { ReactNode } from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  flex: 1;
  padding: 20px 5%; // 상하 20px, 좌우 5%
  background-color: green;
  overflow-y: auto;

  @media (min-width: 1200px) {
    padding: 20px 10%; // 화면 너비가 1200px 이상일 때 좌우 10%
  }
  @media (min-width: 1800px) {
    padding: 20px 20%; // 화면 너비가 1200px 이상일 때 좌우 10%
  }
`;

// const Content = styled.div`
//   height: 300vh;
// `;

interface AdminDashboardProps {
  children: ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <DashboardContainer>
      {children}
      {/* Dashboard content can be added here */}
      {/* <Content /> */}
    </DashboardContainer>
  );
};

export default AdminDashboard;
