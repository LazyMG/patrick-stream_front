import styled from "styled-components";
import { APIAlbum } from "../../shared/models/album";
import { Link } from "react-router-dom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { useSetRecoilState } from "recoil";
import { playingPlaylistState } from "../../app/entities/music/atom";

const ExactResultContainerContent = styled.div`
  display: flex;
  padding: 15px 10px;
  position: relative;
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

  cursor: pointer;
`;

const ExactResultInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
`;

const ExactAlbumResult = ({ data }: { data: APIAlbum }) => {
  const playMusic = usePlayMusic();
  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);

  const playAlbumMusics = () => {
    if (!data?.musics) return;
    setPlayingPlaylist(data.musics);
    playMusic(data.musics[0], true);
  };

  return (
    <ExactResultContainerContent>
      <ExactResultContainerContentMask $bgUrl={data.coverImg} />
      <ExactResultItem>
        <Link to={`/albums/${data._id}`}>
          <ExactResultImage $imgUrl={data.coverImg} />
        </Link>
        <ExactResultInfo>
          <ExactResultTitle>
            <Link to={`/albums/${data._id}`}>{data.title}</Link>
          </ExactResultTitle>
          <ExactResultDescription>
            {data.category}
            {" • "}
            <Link to={`/artists/${data.artists ? data.artists[0]._id : ""}`}>
              {data.artists ? data.artists[0].artistname : ""}
            </Link>
          </ExactResultDescription>
        </ExactResultInfo>
      </ExactResultItem>
      <ExactResultButtonContainer>
        <Button onClick={playAlbumMusics}>재생</Button>
      </ExactResultButtonContainer>
    </ExactResultContainerContent>
  );
};

export default ExactAlbumResult;
