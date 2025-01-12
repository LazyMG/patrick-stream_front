import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #000;
  padding: 20px;
  padding-top: 56px;
  color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const MenuItem = styled.a`
  margin: 10px 0;

  font-size: 16px;

  border-radius: 15px;
  cursor: pointer;
  background-color: #2e2e2e;

  a {
    color: #fff;
    text-decoration: none;
    display: flex;
    padding: 8px 10px;
    justify-content: center;
    border-radius: 10px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AdminSidebar: React.FC = () => {
  return (
    <SidebarContainer>
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
      <MenuItem>
        <Link to={"/"}>Client Home</Link>
      </MenuItem>
    </SidebarContainer>
  );
};

export default AdminSidebar;
