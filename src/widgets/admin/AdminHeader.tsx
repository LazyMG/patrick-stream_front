import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #000;
  color: #fff;
`;

const Title = styled.h1``;

const AdminHeader: React.FC = () => {
  return (
    <HeaderContainer>{/* <Title>Patrick Stream</Title> */}</HeaderContainer>
  );
};

export default AdminHeader;
