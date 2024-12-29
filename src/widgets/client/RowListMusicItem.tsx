import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { Link } from "react-router-dom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedMusicState } from "../../app/entities/music/atom";

const Wrapper = styled.div<{ $isLast: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 35px 12fr 5fr 5fr 7fr 1.5fr;
  grid-template-rows: 35px;
  column-gap: 15px;
  align-items: center;

  padding: 10px 2px;

  ${(props) => !props.$isLast && `border-bottom: 0.01px solid #575757;`}

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
  length,
}: {
  music: APIMusic;
  index: number;
  length: number;
}) => {
  const playMusic = usePlayMusic();
  const [views, setViews] = useState<number>(music?.counts.views || 0);
  // const selectedMusic = useRecoilValue(selectedMusicState);

  // const clickViews = () => {
  //   if (selectedMusic?._id === music._id) return;
  //   setViews((prev) => {
  //     if (!prev && !selectedMusic) return prev;
  //     else if (!selectedMusic) return prev + 1;
  //     return selectedMusic.counts.views + 1;
  //   });
  //   playMusic(music);
  // };

  const selectedMusic = useRecoilValue(selectedMusicState);

  useEffect(() => {
    if (selectedMusic && selectedMusic._id === music._id) {
      console.log("Row", selectedMusic);
      setViews((prev) => prev + 1);
    }
  }, [selectedMusic, music._id]);

  const clickViews = () => {
    if (selectedMusic?._id === music._id) return;
    playMusic(music);

    // if (!setFunc) return;
    // setFunc((prev) => {
    //   if (!prev) return prev;
    //   if (prev.some((item) => item._id === music._id)) {
    //     return prev.map((item) => {
    //       if (item._id === music._id)
    //         return {
    //           ...music,
    //           counts: {
    //             likes: music.counts.likes,
    //             views: music.counts.views + 1,
    //           },
    //         };
    //       return item;
    //     });
    //   } else {
    //     return prev;
    //   }
    // });
  };

  return (
    <Wrapper key={music._id} $isLast={length === index + 1}>
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
      {/* <Views>
        {selectedMusic && selectedMusic._id === music._id
          ? selectedMusic.counts.views
          : music.counts.views}
        회
      </Views> */}
      <Views>{views}회</Views>
      <Album>
        <Link to={`/albums/${music.album._id}`}>{music.album.title}</Link>
      </Album>
      <Duration>{setMusicSeconds(music.duration)}</Duration>
    </Wrapper>
  );
};

export default RowListMusicItem;
