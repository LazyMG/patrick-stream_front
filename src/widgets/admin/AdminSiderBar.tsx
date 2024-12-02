import { Link } from "react-router-dom";
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
  background-color: yellowgreen;

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
        <Link to={"/"}>Home</Link>
      </MenuItem>
    </SidebarContainer>
  );
};

export default AdminSidebar;
