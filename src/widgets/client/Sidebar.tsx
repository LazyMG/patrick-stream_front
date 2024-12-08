import { useState } from "react";
import styled from "styled-components";
import PlayListContainer from "./PlayListContainer";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 250px;

  /* border-right: 1px solid #3d3d3d; */
  box-shadow: 1px 0 0 #3d3d3d;

  /* background-color: #a52a2a; */

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

const Menu = styled.div<{ $isActive: boolean }>`
  width: 100%;
  height: 50px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 0 20px;
  gap: 20px;
  box-sizing: border-box;

  cursor: pointer;

  color: #dddddd;

  ${(props) => (props.$isActive ? `background-color:#2e2e2e` : "")};

  svg {
    width: 25px;
  }

  &:hover {
    ${(props) => (props.$isActive ? "" : `background-color:#424242`)};
  }
`;

const Divider = styled.div`
  height: 1px;
  box-sizing: border-box;

  background-color: #3d3d3d;
  margin: 20px 10px;
`;

// const PlaylistContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
//   width: 100%;
//   padding: 0 10px;
//   box-sizing: border-box;

//   /* background-color: darkviolet; */

//   overflow: hidden; /* PlaylistView 영역을 넘지 않도록 설정 */

//   /* margin-bottom: 80px;  // Playbar 올라왔을 때 */
// `;

const CreateButton = styled.div`
  width: 90%;
  padding: 23px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  max-height: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  color: #dddddd;

  cursor: pointer;

  background-color: #2e2e2e;

  svg {
    width: 20px;
  }

  &:hover {
    background-color: #424242;
  }
`;

const PlaylistView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-height: 50%; // max-height로 변경
  box-sizing: border-box;

  /* background-color: darkcyan; */

  overflow-y: auto; // scroll에서 auto로 변경
`;

const ListItem = styled.div`
  width: 100%;
  min-height: 50px; // height에서 min-height로 변경
  flex-shrink: 0; // 추가: 아이템의 크기 유지

  border-radius: 15px;

  color: #dddddd;

  cursor: pointer;

  &:hover {
    background-color: #424242;
  }

  /* background-color: yellowgreen; */
`;

const Sidebar = () => {
  const isActive = true;
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Wrapper>
        <MenuContainer>
          <Menu $isActive={isActive}>
            {isActive ? (
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            ) : (
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            )}
            <span>홈</span>
          </Menu>
          <Menu $isActive={false}>
            <svg
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <span>둘러보기</span>
          </Menu>
          <Menu $isActive={false}>
            <svg
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
            <span>보관함</span>
          </Menu>
        </MenuContainer>
        <Divider />
        <PlayListContainer />
      </Wrapper>
    </>
  );
};

export default Sidebar;
