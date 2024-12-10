import styled from "styled-components";
import RowList from "../../widgets/client/RowList";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import FlexList from "../../widgets/client/FlexList";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;

  position: relative;

  z-index: 2;

  /* background-color: blue; */
`;

const InfoHeader = styled.div`
  margin-top: 400px;
  display: flex;
  flex-direction: column;

  gap: 20px;

  color: #fff;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 48px;
`;

const Info = styled.p``;

const Followers = styled.span``;

const ControlContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  gap: 20px;
`;

const CircleButton = styled(DefaultButton)`
  background-color: green;
  width: 70px;
  height: 70px;
  padding: 5px;
  border-radius: 50%;

  display: flex;
  justify-content: center;

  &:hover {
    background-color: #11b611;
  }
`;

const FollowButton = styled(DefaultButton)`
  color: #fff;

  font-size: 16px;

  background-color: blue;
  padding: 5px 30px;
`;

const ContentContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Artist = () => {
  return (
    <Wrapper>
      <InfoHeader>
        <Title>백예린</Title>
        <Info>가수</Info>
        <Followers>100명</Followers>
      </InfoHeader>
      <ControlContainer>
        <CircleButton>{">"}</CircleButton>
        <FollowButton>팔로우</FollowButton>
      </ControlContainer>
      <ContentContainer>
        <RowList title={"인기 음악"} />
        <FlexList title="앨범" isCustom={false} />
      </ContentContainer>
    </Wrapper>
  );
};

export default Artist;
