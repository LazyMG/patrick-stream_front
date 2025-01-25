import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 70vh;

  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.span`
  font-size: 24px;
  color: #a5a5a5;
`;

const Title = styled.span`
  font-size: 48px;
  font-weight: bold;
`;

const Comming = () => {
  return (
    <Wrapper>
      <SubTitle>준비 중입니다.</SubTitle>
      <Title>Comming Soon!</Title>
    </Wrapper>
  );
};

export default Comming;
