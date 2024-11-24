import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: lightblue;
  padding: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const MenuItem = styled.a`
  margin: 10px 0;

  font-size: 16px;
  cursor: pointer;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <MenuItem>
        <Link to={"/"}>Home</Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/admin/main"}>Main</Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/admin/musics"}>Musics</Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/admin/albums"}>Albums</Link>
      </MenuItem>
      <MenuItem>
        <Link to={"/admin/artists"}>Artists</Link>
      </MenuItem>
    </SidebarContainer>
  );
};
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: beige;
  color: #fff;
`;

const Title = styled.h1``;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Admin Dashboard</Title>
      <div>Profile</div>
    </HeaderContainer>
  );
};

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

const Content = styled.div`
  height: 300vh;
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <Outlet />
      {/* Dashboard content can be added here */}
      {/* <Content /> */}
    </DashboardContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  box-sizing: border-box;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const AdminLayout = () => {
  console.log(window.innerWidth);
  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <Dashboard />
      </MainContent>
    </PageContainer>
  );
};

export default AdminLayout;
