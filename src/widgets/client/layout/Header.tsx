import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { userState } from "../../../app/entities/user/atom";
import { useRecoilValue } from "recoil";
import SearchForm from "./../SearchForm";

import LogoComponent from "../../../assets/new-logo.svg?react";

const Wrapper = styled.header<{ $navShow: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 80px;
  display: flex;

  background-color: ${({ $navShow }) => ($navShow ? "black" : "transparent")};
  border-bottom: ${({ $navShow }) => ($navShow ? "1px solid #585858" : "none")};

  transition: background-color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
`;

const IconContainer = styled.div<{
  $navShow: boolean;
  $isSideBarChange: boolean;
}>`
  height: 100%;
  width: 250px;
  display: flex;
  padding-left: 16px;
  align-items: center;
  box-sizing: border-box;

  position: relative;

  ${(props) => (props.$navShow ? `` : `box-shadow: 1px 0 0 #3d3d3d;`)}

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

  @media (max-width: 940px) {
    background-color: transparent;
    box-shadow: none;
  }

  ${(props) =>
    props.$isSideBarChange &&
    css`
      background-color: transparent;
      box-shadow: none;
      width: 240px;
    `}
`;

const InfoButton = styled.div`
  background-color: #4f4f4f;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  font-weight: bold;
  font-size: 12px;

  position: absolute;
  right: 44px;

  cursor: pointer;

  color: #fff;

  @media (max-width: 940px) {
    display: none;
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

const SearchContainer = styled.div<{ $isSideBarChange: boolean }>`
  height: 100%;
  width: calc(100% - 250px);

  padding: 0 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  /* 화면 너비에 따라 패딩을 다르게 설정 */
  @media (max-width: 2800px) {
    padding: 0 18%;
  }

  @media (max-width: 1800px) {
    padding: 0 8%;
  }

  @media (max-width: 940px) {
    justify-content: flex-end;
    gap: 12px;
  }

  ${(props) =>
    props.$isSideBarChange &&
    css`
      width: 100%;
      padding-left: 0 !important;
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ $alter: boolean }>`
  border: none;
  background-color: ${(props) =>
    props.$alter ? "white" : props.theme.color.pink};
  color: #000;
  width: 120px;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 16px;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

  cursor: pointer;

  &:first-child {
    svg {
      display: none;
    }
  }

  @media (max-width: 1200px) {
    width: 96px;
    font-size: 14px;
  }

  @media (max-width: 940px) {
    width: 48px;
    font-size: 0;
    height: 48px;

    &:nth-child(2) {
      display: none;
    }

    &:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        display: block;
        width: 25px;
      }
      span {
        display: none;
      }
    }
  }
`;

const Profile = styled.span`
  cursor: pointer;

  svg {
    width: 50px;
    height: 50px;
    color: #fff;
  }
`;

interface IHeader {
  $navShow: boolean;
  setIsSideBarChange: React.Dispatch<React.SetStateAction<boolean>>;
  isSideBarChange: boolean;
}

const Header = ({ $navShow, setIsSideBarChange, isSideBarChange }: IHeader) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const alter = true;

  const gotoProfile = () => {
    navigate(`/users/${user.userId}`);
  };

  const toggleMenuClick = () => {
    setIsSideBarChange((prev) => !prev);
  };

  return (
    <Wrapper $navShow={$navShow}>
      <IconContainer $navShow={$navShow} $isSideBarChange={isSideBarChange}>
        <MenuButton onClick={toggleMenuClick}>
          <svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            ></path>
          </svg>
        </MenuButton>
        <LogoComponent onClick={() => navigate("/")} />
        <span>
          Patrick <br /> Stream
        </span>
        {!isSideBarChange && (
          <InfoButton onClick={() => navigate("/info")}>i</InfoButton>
        )}
      </IconContainer>
      <SearchContainer $isSideBarChange={isSideBarChange}>
        <SearchForm />
        {!user.loading && (
          <ButtonContainer>
            {user.userId !== "" ? (
              <Profile onClick={gotoProfile}>
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
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </Profile>
            ) : (
              <>
                <Button $alter={alter} onClick={() => navigate("/login")}>
                  <span>로그인</span>
                  <svg
                    data-slot="icon"
                    fill="none"
                    stroke-width="1.5"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    ></path>
                  </svg>
                </Button>
                <Button $alter={!alter} onClick={() => navigate("/signIn")}>
                  가입하기
                </Button>
              </>
            )}
          </ButtonContainer>
        )}
      </SearchContainer>
    </Wrapper>
  );
};

export default Header;
