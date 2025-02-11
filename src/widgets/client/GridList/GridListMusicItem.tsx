import { Link } from "react-router-dom";
import styled from "styled-components";
import { APIMusic } from "../../../shared/models/music";
import { usePlayMusic } from "../../../shared/hooks/usePlayMusic";

const Wrapper = styled.div`
  max-width: 410px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Image = styled.div<{ $imgUrl: string }>`
  border-radius: 2px;
  height: 100%;
  aspect-ratio: 1 / 1;
  background: ${({ $imgUrl }) => `url(${$imgUrl})`};
  background-size: cover;
  flex-shrink: 0;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  width: 80%;
`;

const Title = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;
`;

const Description = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const GridListMusicItem = ({ music }: { music: APIMusic }) => {
  const playMusic = usePlayMusic();

  return (
    <Wrapper>
      <Image $imgUrl={music.coverImg} />
      <Info>
        <Title onClick={() => playMusic(music)}>{music.title}</Title>
        <Description>
          <Link to={`/artists/${music.artists ? music.artists[0]._id : ""}`}>
            {music.artists ? music.artists[0].artistname : ""}
          </Link>
          {" • "}
          <Link to={`/albums/${music.album ? music.album._id : ""}`}>
            {music.album ? music.album.title : ""}
          </Link>
        </Description>
      </Info>
    </Wrapper>
  );
};

export default GridListMusicItem;
