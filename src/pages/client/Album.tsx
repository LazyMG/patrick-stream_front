import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { backgroundState } from "../../app/entities/global/atom";
import { useCallback, useEffect, useState } from "react";
import { APIAlbum } from "../../shared/models/album";
import { DefaultButton } from "../../shared/ui/DefaultButton";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 100px;

  box-sizing: border-box;

  position: relative;

  z-index: 2;

  /* background-color: blue; */
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding-top: 20px;
  min-height: 100vh;
`;

const AlbumInfo = styled.div`
  position: sticky;
  top: 120px;
  width: 30%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: flex-start;
  margin-right: 80px;
`;

const AlbumArtist = styled.span`
  cursor: pointer;
`;

const AlbumImage = styled.div<{ $img?: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 15px;
  background-image: ${(props) => (props.$img ? `url(${props.$img})` : "")};
  background-size: cover;
`;

const AlbumTitle = styled.h1`
  width: 100%;
  font-weight: bold;
  font-size: 24px;
  word-wrap: break-word;
  text-align: center;
`;

const AlbumDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AlbumDescription = styled.p`
  text-align: center;
`;

const AlbumController = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const AlbumPlayButton = styled.button`
  border: none;
  background: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: black;
  color: #fff;

  cursor: pointer;
`;

const AlbumFollowButton = styled(DefaultButton)`
  background-color: black;
  color: #fff;
`;

const AlbumListContainer = styled.div`
  width: 70%;
  margin-left: auto;
  /* min-height: 80vh; */
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AlbumListItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  align-items: center;
  height: 50px;
`;

const ItemNumber = styled.span`
  text-align: center;
  min-width: 30px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ItemTitle = styled.span`
  font-weight: bold;
`;

const ItemViews = styled.span``;

const ItemDuration = styled.span`
  min-width: 30px;
`;

const Album = () => {
  const { albumId } = useParams();
  const setBackground = useSetRecoilState(backgroundState);
  const [isLoading, setIsLoading] = useState(false);
  const [albumData, setAlbumData] = useState<APIAlbum | null>(null);

  const getAlbum = useCallback(
    async (id: string) => {
      const result = await fetch(
        `http://localhost:5000/album/6751585f3ebf076c533208c3`
      ).then((res) => res.json());

      if (result.ok) {
        setAlbumData(result.album as APIAlbum);
        setBackground({ src: result.album.coverImg, type: "blur" });
      }
    },
    [setBackground]
  );

  useEffect(() => {
    if (albumId) {
      setIsLoading(true);
      getAlbum(albumId);
      setIsLoading(false);
    }
  }, [albumId, getAlbum]);

  return (
    <Wrapper>
      <ContentContainer>
        {albumData && (
          <>
            <AlbumInfo>
              <AlbumArtist>백예린</AlbumArtist>
              <AlbumImage $img={albumData.coverImg} />
              <AlbumTitle>{albumData.title}</AlbumTitle>
              <AlbumDescriptionContainer>
                <AlbumDescription>
                  {albumData.category}|{albumData.released_at}
                </AlbumDescription>
                <AlbumDescription>
                  {albumData.length}|{albumData.total_duration}
                </AlbumDescription>
              </AlbumDescriptionContainer>
              <AlbumController>
                <AlbumPlayButton>{">"}</AlbumPlayButton>
                <AlbumFollowButton>팔로우</AlbumFollowButton>
              </AlbumController>
            </AlbumInfo>
            <AlbumListContainer>
              {Array.from({ length: 3 }).map((_, idx) => (
                <AlbumListItem key={idx}>
                  <ItemNumber>{idx + 1}</ItemNumber>
                  <ItemInfo>
                    <ItemTitle>우주를 건너</ItemTitle>
                    <ItemViews>100회</ItemViews>
                  </ItemInfo>
                  <ItemDuration>3:02</ItemDuration>
                </AlbumListItem>
              ))}
            </AlbumListContainer>
          </>
        )}
      </ContentContainer>
    </Wrapper>
  );
};

export default Album;
