import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  gap: 10px;
`;

const Row = styled.span`
  a {
    color: white;
  }
`;

const Info = () => {
  return (
    <Wrapper>
      <ContentContainer>
        <Title>프로젝트 안내</Title>
        <Content>
          <Row>
            본 프로젝트에 사용된 컨텐츠의 저작권은 모두 유튜브에 있습니다.
            따라서 저작권 관련 문제가 발생할 시에 사이트의 운영이 정지될 수
            있습니다.
          </Row>
          <Row>본 프로젝트의 책임자 이메일: cbfmark@gmail.com</Row>
          <Row>본 프로젝트의 깃허브 주소는 다음과 같습니다.</Row>
          <Row>
            프론트엔드 프로젝트:{" "}
            <Link
              target="_"
              to={"https://github.com/LazyMG/patrick-stream_front"}
            >
              https://github.com/LazyMG/patrick-stream_front
            </Link>
          </Row>
          <Row>
            백엔드 프로젝트:{" "}
            <Link
              target="_"
              to={"https://github.com/LazyMG/patrick-stream_front"}
            >
              https://github.com/LazyMG/patrick-stream_front
            </Link>
          </Row>
        </Content>
      </ContentContainer>
    </Wrapper>
  );
};

export default Info;
