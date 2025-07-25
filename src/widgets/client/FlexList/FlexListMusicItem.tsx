import { Link } from "react-router-dom";
import styled from "styled-components";
import { APIMusic } from "../../../shared/models/music";
import { usePlayMusic } from "../../../shared/hooks/usePlayMusic";
import { useSetRecoilState } from "recoil";
import { playingPlaylistState } from "../../../app/entities/music/atom";

const ListItem = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 5px;
`;

const ImageMask = styled.div`
  position: absolute;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;

  display: none;

  background-color: rgba(0, 0, 0, 0.3);
`;

const Image = styled.div<{ $imgUrl: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;

  background-image: ${(props) => props.$imgUrl && `url(${props.$imgUrl})`};
  background-size: cover;

  border-radius: 10px;

  position: relative;

  cursor: pointer;

  &:hover ${ImageMask} {
    display: block;
  }
`;

const Info = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 5px;

  font-size: 16px;

  /* @media (max-width: 940px) {
    font-size: 14px;
  }
  @media (max-width: 614px) {
    font-size: 12px;
  } */
`;

const Title = styled.span`
  width: fit-content;
  font-weight: bold;

  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  gap: 2px;
`;

const Category = styled.span``;

const Aritst = styled.span`
  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FlexListMusicItem = ({ music }: { music: APIMusic }) => {
  const playMusic = usePlayMusic();
  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);

  const clickMusic = () => {
    playMusic(music);
    setPlayingPlaylist((prev) => {
      if (!prev) return prev;
      if (prev.some((item) => item._id === music._id)) {
        // exists
        const newList = prev.filter((item) => item._id !== music._id);
        return [music, ...newList];
      } else {
        // none
        const newList = prev.slice(0, 19);
        return [music, ...newList];
      }
    });
  };

  return (
    <ListItem>
      <Image $imgUrl={music.coverImg} onClick={clickMusic}>
        <ImageMask />
      </Image>
      <Info>
        <Title onClick={clickMusic}>{music.title}</Title>
        <Description>
          <Category>노래</Category>
          {" • "}
          <Aritst>
            <Link to={`/artists/${music.artists ? music.artists[0]._id : ""}`}>
              {music.artists ? music.artists[0].artistname : ""}
            </Link>
          </Aritst>
        </Description>
      </Info>
    </ListItem>
  );
};

export default FlexListMusicItem;
