import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { Link } from "react-router-dom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 35px 12fr 5fr 5fr 7fr 1.5fr;
  grid-template-rows: 35px;
  column-gap: 15px;
  align-items: center;

  padding: 10px 2px;

  &:not(:nth-child(5)) {
    border-bottom: 0.01px solid #575757; /* 원하는 색상과 두께로 설정 */
  }

  a {
    color: #fff;
  }
`;

const Number = styled.span`
  color: #fff;
`;

const Image = styled.div<{ $img: string }>`
  background-image: ${(props) => (props.$img ? `url(${props.$img})` : "")};
  background-size: cover;
  background-position: center;
  height: 100%;
  border-radius: 5px;

  cursor: pointer;
`;

const Title = styled.div`
  span {
    width: fit-content;
    cursor: pointer;
  }
`;

const Artist = styled.span`
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Views = styled.span``;

const Album = styled.span`
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Duration = styled.span``;

const RowListMusicItem = ({
  music,
  index,
}: {
  music: APIMusic;
  index: number;
}) => {
  const playMusic = usePlayMusic();
  const [views, setViews] = useState<number>(music?.counts.views || 0);

  const clickViews = () => {
    setViews((prev) => prev + 1);
    playMusic(music);
  };

  return (
    <Wrapper key={music._id}>
      <Number>{index + 1}</Number>
      <Image $img={music.coverImg} onClick={clickViews} />
      <Title>
        <span onClick={clickViews}>{music.title}</span>
      </Title>
      <Artist>
        <Link to={`/artists/${music.artists[0]._id}`}>
          {music.artists[0].artistname}
        </Link>
      </Artist>
      <Views>{views}회</Views>
      <Album>
        <Link to={`/albums/${music.album._id}`}>{music.album.title}</Link>
      </Album>
      <Duration>{setMusicSeconds(music.duration)}</Duration>
    </Wrapper>
  );
};

export default RowListMusicItem;
