import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header<{ $navShow: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
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
`;

const SearchContainer = styled.div`
  height: 100%;
  width: calc(100% - 250px);

  padding: 0 12%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  /* background-color: dimgray; */
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
    }
  }

  input {
    width: 500px;
    outline: none;
    padding: 12px 0;
    padding-left: 50px;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    color: #fff;

    background-color: rgba(163, 163, 163, 0.402);

    &:focus {
      border: none;
      outline: none;
    }

    &:active {
      border: none;
      outline: none;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ $alter: boolean }>`
  border: none;
  background-color: ${(props) => (props.$alter ? "white" : "red")};
  color: ${(props) => (props.$alter ? "black" : "white")};
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

interface IHeader {
  $navShow: boolean;
}

const Header = ({ $navShow }: IHeader) => {
  const navigate = useNavigate();

  const alter = true;

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
        <ButtonContainer>
          <Button $alter={alter} onClick={() => navigate("/login")}>
            로그인
          </Button>
          <Button $alter={!alter} onClick={() => navigate("/signIn")}>
            가입하기
          </Button>
        </ButtonContainer>
      </SearchContainer>
    </Wrapper>
  );
};

export default Header;
