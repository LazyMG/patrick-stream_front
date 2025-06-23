import styled from "styled-components";
import { APIArtist } from "../../../shared/models/artist";
import { Link } from "react-router-dom";
import { usePlayMusic } from "../../../shared/hooks/usePlayMusic";
import { useSetRecoilState } from "recoil";
import { playingPlaylistState } from "../../../app/entities/music/atom";

const ExactResultContainerContent = styled.div`
  display: flex;
  padding: 15px 10px;
  position: relative;

  @media (max-width: 614px) {
    flex-direction: column;
  }
`;

const ExactResultContainerContentMask = styled.div<{ $bgUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  background-image: ${(props) => props.$bgUrl && `url(${props.$bgUrl})`};
  background-size: cover;
  background-position: center;
  filter: blur(5px);
  opacity: 0.5;

  border-radius: 15px;
`;

const ExactResultItem = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  gap: 20px;
  padding: 15px 10px;
  z-index: 1;
`;

const ExactResultImage = styled.div<{ $imgUrl: string }>`
  height: 100%;
  aspect-ratio: 1 / 1;

  background-image: ${(props) => props.$imgUrl && `url(${props.$imgUrl})`};
  background-size: cover;
  background-position: center;

  border-radius: 50%;

  cursor: pointer;
`;

const ExactResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 614px) {
    justify-content: center;
    gap: 10px;
  }
`;

const ExactResultTitle = styled.h4`
  font-weight: bold;
  font-size: 18px;

  a {
    color: #fff;
  }

  cursor: pointer;
`;

const ExactResultDescription = styled.div`
  font-size: 18px;
  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 614px) {
    font-size: 15px;
  }
`;

const ExactResultButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
`;

const Button = styled.button`
  border: none;
  background-color: #fff;
  color: #000;
  width: 120px;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 15px;

  cursor: pointer;

  @media (max-width: 614px) {
    width: 100%;
  }
`;

const ExactArtistResult = ({ data }: { data: APIArtist }) => {
  const playMusic = usePlayMusic();
  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);

  const playArtistMusics = () => {
    if (!data?.musics) return;
    setPlayingPlaylist(data.musics);
    playMusic(data.musics[0], true);
  };

  return (
    <ExactResultContainerContent>
      <ExactResultContainerContentMask $bgUrl={data.coverImg} />
      <ExactResultItem>
        <Link to={`/artists/${data._id}`}>
          <ExactResultImage $imgUrl={data.coverImg} />
        </Link>
        <ExactResultInfo>
          <ExactResultTitle>
            <Link to={`/artists/${data._id}`}>{data.artistname}</Link>
          </ExactResultTitle>
          <ExactResultDescription>
            아티스트
            {" • "}
            팔로워 {data.followers?.length}명
          </ExactResultDescription>
        </ExactResultInfo>
      </ExactResultItem>
      <ExactResultButtonContainer>
        <Button onClick={playArtistMusics}>재생</Button>
      </ExactResultButtonContainer>
    </ExactResultContainerContent>
  );
};

export default ExactArtistResult;
