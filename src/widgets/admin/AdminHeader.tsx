import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: beige;
  color: #fff;
`;

const Title = styled.h1``;

const AdminHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Admin Dashboard</Title>
      <div>Profile</div>
    </HeaderContainer>
  );
};

export default AdminHeader;
