import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { Link } from "react-router-dom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedMusicState } from "../../app/entities/music/atom";
import { isToastOpenState } from "../../app/entities/global/atom";
import { playlistMusicsState } from "../../app/entities/playlist/atom";

const Number = styled.span`
  color: #fff;
  text-align: center;
`;

const MaskDiv = styled.div`
  background-color: #000;

  display: none;
  position: absolute;

  left: 0;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;

const Wrapper = styled.div<{
  $isLast: boolean;
  $isMine?: boolean;
  $isToastOpen: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 35px 12fr 5fr 5fr 7fr 1.5fr;
  grid-template-rows: 35px;
  column-gap: 15px;
  align-items: center;

  padding: 10px 2px;

  position: relative;

  ${(props) =>
    props.$isToastOpen &&
    `${MaskDiv}{display: block;
    z-index: 10;}`}

  &:hover ${Number} {
    ${(props) => props.$isMine && `opacity: 0;`}
  }

  &:hover ${MaskDiv} {
    ${(props) =>
      props.$isMine &&
      `display: block;
    z-index: 10;`}
  }

  

  ${(props) => !props.$isLast && `border-bottom: 0.01px solid #575757;`}

  a {
    color: #fff;
  }
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
  isMine,
}: {
  music: APIMusic;
  index: number;
  length: number;
  isMine?: boolean;
}) => {
  const playMusic = usePlayMusic();
  const [views, setViews] = useState<number>(music?.counts.views || 0);
  const checkboxInput = useRef<HTMLInputElement>(null);
  const [isToastOpen, setIsToastOpen] = useRecoilState(isToastOpenState);

  const selectedMusic = useRecoilValue(selectedMusicState);

  const setPlaylistMusics = useSetRecoilState(playlistMusicsState);

  useEffect(() => {
    if (selectedMusic && selectedMusic._id === music._id) {
      setViews((prev) => prev + 1);
    }
  }, [selectedMusic, music._id]);

  useEffect(() => {
    if (!isMine) {
      setIsToastOpen(false);
    }
  }, [isMine, setIsToastOpen]);

  const clickViews = () => {
    if (selectedMusic?._id === music._id) return;
    playMusic(music);
  };

  const onChangeHandler = () => {
    if (checkboxInput.current) {
      const isChecked = checkboxInput.current.checked;
      let flag = false;
      setPlaylistMusics((prev) => {
        if (!prev) return prev;
        const newStateList = [...prev.states];
        newStateList[index] = isChecked;
        flag = newStateList.some((state) => state);
        return {
          ...prev,
          states: newStateList,
        };
      });
      setIsToastOpen(flag);
    }
  };

  return (
    <Wrapper
      key={music._id}
      $isLast={length === index + 1}
      $isMine={isMine}
      $isToastOpen={isToastOpen}
    >
      <MaskDiv>
        <CheckBox
          type="checkbox"
          ref={checkboxInput}
          onChange={onChangeHandler}
        />
      </MaskDiv>
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
