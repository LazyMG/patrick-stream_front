import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 80px;
  display: flex;

  background-color: rgb(250, 235, 215);
`;

const IconContainer = styled.div`
  height: 100%;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: azure;
`;

const SearchContainer = styled.div`
  height: 100%;
  width: calc(100% - 250px);

  padding: 0 12%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  background-color: dimgray;

  input {
    width: 500px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <IconContainer>Patrick Stream</IconContainer>
      <SearchContainer>
        <input type="text" />
        <ButtonContainer>
          <button onClick={() => navigate("/login")}>로그인</button>
          <button onClick={() => navigate("/signIn")}>가입하기</button>
        </ButtonContainer>
      </SearchContainer>
    </Wrapper>
  );
};

export default Header;
