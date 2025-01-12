import { ReactNode } from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  flex: 1;
  padding: 20px 5%;
  background-color: #000;
  overflow-y: auto;

  @media (min-width: 1200px) {
    padding: 20px 10%;
  }
  @media (min-width: 1800px) {
    padding: 20px 20%;
  }
`;

const AdminDashboard = ({ children }: { children: ReactNode }) => {
  return <DashboardContainer>{children}</DashboardContainer>;
};

export default AdminDashboard;
