import styled from "styled-components";
import RowList from "../../widgets/client/RowList";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import FlexList from "../../widgets/client/FlexList";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { backgroundState } from "../../app/entities/global/atom";

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
  const { artistId } = useParams();
  const setBackground = useSetRecoilState(backgroundState);
  const [isLoading, setIsLoading] = useState(false);
  const [artistData, setArtistData] = useState(null);

  const getArtist = useCallback(
    async (id: string) => {
      const result = await fetch(
        `http://localhost:5000/artist/${id}`
      ).then((res) => res.json());

      if (result.ok) {
        setArtistData(result.artist);
        setBackground({ src: result.artist.coverImg, type: "simple" });
      }
    },
    [setBackground]
  );

  useEffect(() => {
    if (artistId) {
      setIsLoading(true);
      getArtist(artistId);
      setIsLoading(false);
    }
  }, [artistId, getArtist]);

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
