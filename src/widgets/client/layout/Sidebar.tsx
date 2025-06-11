import styled, { css } from "styled-components";
import { Link, useMatch, useNavigate } from "react-router-dom";
import PlayListContainer from "./PlayListContainer";
import LogoComponent from "../../../assets/new-logo.svg?react";

const Wrapper = styled.div<{
  $isSideBarChange: boolean;
  $isOverlay?: boolean;
  $visible?: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: ${({ $isOverlay }) => ($isOverlay ? 100 : 1)};
  background-color: ${(props) =>
    props.$isSideBarChange ? "transparent" : "#111"};
  display: flex;
  flex-direction: column;

  width: ${({ $isOverlay, $isSideBarChange }) =>
    $isOverlay ? "250px" : $isSideBarChange ? "72px" : "250px"};

  box-shadow: ${({ $isOverlay, $isSideBarChange }) =>
    $isOverlay || $isSideBarChange ? "none" : "1px 0 0 #3d3d3d"};

  transition: transform 0.1s ease-in-out, visibility 0.1s ease-in-out;

  ${({ $isOverlay, $visible }) =>
    $isOverlay &&
    css`
      transform: ${$visible ? "translateX(0)" : "translateX(-100%)"};
      opacity: ${$visible ? 1 : 0};
      visibility: ${$visible ? "visible" : "hidden"};
      pointer-events: ${$visible ? "auto" : "none"};
    `}

  @media (max-width: 940px) {
    ${({ $isOverlay }) =>
      !$isOverlay &&
      css`
        width: 72px;
        box-shadow: none;
      `}
  }

  @media (max-width: 614px) {
    ${({ $isOverlay }) =>
      !$isOverlay &&
      css`
        display: none;
      `}
  }
`;

const ResponseSidebarHeader = styled.div`
  width: 100%;
  height: 80px;
  position: absolute;
  display: flex;
  padding-left: 16px;
  align-items: center;
  box-sizing: border-box;

  color: #fff;

  & > svg {
    width: 30px;
    cursor: pointer;
    height: fit-content;
    margin-left: 10px;
  }

  span {
    margin-left: 4px;
    font-size: 18px;
    font-weight: bold;
    line-height: -2px;
  }
`;

const MenuButton = styled.div`
  width: 25px;
  cursor: pointer;
  border-radius: 50%;
  padding: 5px;

  &:hover {
    background-color: rgba(100, 100, 100, 0.8);
  }
`;

const MenuContainer = styled.div<{ $isSideBarChange: boolean }>`
  margin-top: 90px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  box-sizing: border-box;

  ${(props) =>
    props.$isSideBarChange &&
    css`
      padding: 8px;
    `}

  a {
    &:active {
      text-decoration: none;
    }
  }

  @media (max-width: 940px) {
    padding: 8px;
  }
`;

const Menu = styled.div<{
  $isActive: boolean;
  $isSideBarChange: boolean;
  $isOverlay: boolean;
}>`
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

  ${(props) =>
    props.$isActive ? `background-color:${props.theme.color.pink}` : ""};
  ${(props) => (props.$isActive ? `color:#000000` : "")};

  svg {
    width: 25px;
  }

  ${(props) =>
    props.$isOverlay
      ? ""
      : props.$isSideBarChange &&
        css`
          flex-direction: column;
          height: 56px;
          gap: 2px;
          padding: 7px 5px;
          svg {
            flex: 1;
          }
          span {
            font-size: 10px;
          }
        `}

  &:hover {
    ${(props) => (props.$isActive ? "" : `background-color:#fcddde`)};
    ${(props) => (props.$isActive ? "" : `color:#000000`)};
  }

  ${(props) =>
    !props.$isOverlay &&
    css`
      @media (max-width: 940px) {
        flex-direction: column;
        height: 56px;
        gap: 2px;
        padding: 7px 5px;
        svg {
          flex: 1;
        }
        span {
          font-size: 10px;
        }
      }
    `}
`;

const Divider = styled.div<{ $isSideBarChange: boolean; $isOverlay: boolean }>`
  height: 1px;
  box-sizing: border-box;

  background-color: #3d3d3d;
  margin: 20px 10px;

  ${(props) =>
    props.$isSideBarChange &&
    css`
      display: none;
    `}

  ${(props) =>
    !props.$isOverlay &&
    css`
      @media (max-width: 940px) {
        display: none;
      }
    `}
`;

const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};

  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

type SidebarProps = {
  isSideBarChange: boolean;
  isOverlay?: boolean;
  visible?: boolean;
  onClose?: () => void;
};

const Sidebar = ({
  isSideBarChange,
  isOverlay = false,
  visible = true,
  onClose,
}: SidebarProps) => {
  const homeMatch = useMatch("/");
  const navigate = useNavigate();

  return (
    <>
      {isOverlay && <Overlay onClick={onClose} $visible={visible} />}
      <Wrapper
        $isSideBarChange={isSideBarChange}
        $isOverlay={isOverlay}
        $visible={visible}
      >
        {isOverlay && (
          <ResponseSidebarHeader>
            <MenuButton onClick={onClose}>
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </MenuButton>
            <LogoComponent onClick={() => navigate("/")} />
            <span>
              Patrick <br /> Stream
            </span>
          </ResponseSidebarHeader>
        )}
        <MenuContainer $isSideBarChange={isSideBarChange}>
          <Link to={"/"}>
            <Menu
              $isActive={!!homeMatch}
              $isSideBarChange={isSideBarChange}
              $isOverlay={isOverlay}
            >
              {homeMatch ? (
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
          </Link>
          <Link to={"/comming"}>
            <Menu
              $isActive={false}
              $isSideBarChange={isSideBarChange}
              $isOverlay={isOverlay}
            >
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
          </Link>
          <Link to={"/comming"}>
            <Menu
              $isActive={false}
              $isSideBarChange={isSideBarChange}
              $isOverlay={isOverlay}
            >
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
          </Link>
        </MenuContainer>
        <Divider $isSideBarChange={isSideBarChange} $isOverlay={isOverlay} />
        <PlayListContainer
          isSideBarChange={isSideBarChange}
          isOverlay={isOverlay}
        />
      </Wrapper>
    </>
  );
};

export default Sidebar;
