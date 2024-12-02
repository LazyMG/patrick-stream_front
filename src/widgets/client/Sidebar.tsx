import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;

  background-color: #a52a2a;

  display: flex;
  flex-direction: column;
`;

const MenuContainer = styled.div`
  margin-top: 90px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  box-sizing: border-box;

  /* background-color: fuchsia; */
`;

const Menu = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 15px;

  cursor: pointer;

  /* background-color: darkcyan; */
`;

const Divider = styled.div`
  height: 1px;
  box-sizing: border-box;

  background-color: white;
  margin: 20px 10px;
`;

const PlaylistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  /* background-color: darkviolet; */

  overflow: hidden; /* PlaylistView 영역을 넘지 않도록 설정 */

  /* margin-bottom: 80px;  // Playbar 올라왔을 때 */
`;

const CreateButton = styled.div`
  padding: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  box-sizing: border-box;

  background-color: floralwhite;
`;

const PlaylistView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-height: 50%; // max-height로 변경
  box-sizing: border-box;

  background-color: darkcyan;

  overflow-y: auto; // scroll에서 auto로 변경
`;

const ListItem = styled.div`
  width: 100%;
  min-height: 50px; // height에서 min-height로 변경
  flex-shrink: 0; // 추가: 아이템의 크기 유지

  background-color: yellowgreen;
`;

const Sidebar = () => {
  return (
    <Wrapper>
      <MenuContainer>
        <Menu>홈</Menu>
        <Menu>둘러보기</Menu>
        <Menu>보관함</Menu>
      </MenuContainer>
      <Divider />
      <PlaylistContainer>
        <CreateButton>새 재생목록 추가</CreateButton>
        <PlaylistView>
          <ListItem />
        </PlaylistView>
      </PlaylistContainer>
    </Wrapper>
  );
};

export default Sidebar;
