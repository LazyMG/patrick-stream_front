import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AdminSidebar from "../../widgets/admin/AdminSiderBar";
import AdminHeader from "../../widgets/admin/AdminHeader";
import AdminDashboard from "../../widgets/admin/AdminDashBoard";
import { useAdmin } from "../../shared/hooks/useAdmin";

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
  const { isLoading, getAdmin } = useAdmin();

  getAdmin();
  return (
    <PageContainer>
      {!isLoading && (
        <>
          <AdminSidebar />
          <MainContent>
            <AdminHeader />
            <AdminDashboard>
              <Outlet />
            </AdminDashboard>
          </MainContent>
        </>
      )}
    </PageContainer>
  );
};

export default AdminLayout;
