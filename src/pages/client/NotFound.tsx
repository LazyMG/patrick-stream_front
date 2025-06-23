import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  box-sizing: border-box;
  background-color: #000;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 48px;

  text-align: center;

  @media (max-width: 614px) {
    font-size: 36px;
  }
`;

const Button = styled.div`
  background-color: ${(props) => props.theme.color.pink};

  padding: 10px 15px;

  border-radius: 15px;

  a {
  }
`;

const NotFound = () => {
  return (
    <Wrapper>
      <Title>잘못된 경로입니다.</Title>
      <Button>
        <Link to={"/"}>메인 페이지</Link>
      </Button>
    </Wrapper>
  );
};

export default NotFound;
