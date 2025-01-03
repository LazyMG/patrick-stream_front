import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userState } from "../../app/entities/user/atom";
import { useRecoilValue } from "recoil";

const Wrapper = styled.header<{ $navShow: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 80px;
  display: flex;

  background-color: ${({ $navShow }) => ($navShow ? "black" : "transparent")};
  border-bottom: ${({ $navShow }) => ($navShow ? "1px solid #585858" : "none")};

  transition: background-color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
`;

const IconContainer = styled.div<{ $navShow: boolean }>`
  height: 100%;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => (props.$navShow ? `` : `box-shadow: 1px 0 0 #3d3d3d;`)}

  color: #fff;

  img {
    width: 65px;
  }
`;

const SearchContainer = styled.div`
  height: 100%;
  width: calc(100% - 250px);

  padding: 0 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  /* 화면 너비에 따라 패딩을 다르게 설정 */
  @media (max-width: 2800px) {
    padding: 0 18%; /* 화면이 1200px 이하일 때 패딩을 6%로 설정 */
  }

  @media (max-width: 1800px) {
    padding: 0 8%; /* 화면이 1200px 이하일 때 패딩을 6%로 설정 */
  }
`;

const SearchForm = styled.form`
  position: relative;

  button {
    position: absolute;
    left: 15px;
    bottom: 0;
    top: 0;
    padding: 0;
    background: none;
    border: none;

    cursor: pointer;
    svg {
      color: #fff;
      width: 25px;

      &:focus {
        color: #f5a3a5;
      }
    }
  }

  input {
    width: 400px;
    outline: none;
    padding: 12px 0;
    padding-left: 50px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    color: #fff;

    background-color: rgba(163, 163, 163, 0.402);

    &:focus {
      border: 0.1px solid #f5a3a5;
      outline: none;
      background-color: #000000;
    }

    &:active {
      border: none;
      outline: none;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ $alter: boolean }>`
  border: none;
  background-color: ${(props) => (props.$alter ? "white" : "#F5A3A5")};
  color: #000;
  width: 120px;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 15px;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
  }
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

  cursor: pointer;
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
}

const Header = ({ $navShow }: IHeader) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const alter = true;

  const gotoProfile = () => {
    navigate(`/users/${user.userId}`);
  };

  return (
    <Wrapper $navShow={$navShow}>
      <IconContainer $navShow={$navShow}>Patrick Stream</IconContainer>
      <SearchContainer>
        <SearchForm>
          <input type="text" />
          <button>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              />
            </svg>
          </button>
        </SearchForm>
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
                  로그인
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
