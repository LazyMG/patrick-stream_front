import styled, { css } from "styled-components";
import { APIMusic } from "../../../shared/models/music";
import { Link } from "react-router-dom";
import { usePlayMusic } from "../../../shared/hooks/usePlayMusic";
import { setMusicSeconds } from "../../../shared/lib/musicDataFormat";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedMusicState } from "../../../app/entities/music/atom";
import { playlistMusicsState } from "../../../app/entities/playlist/atom";
import { isPlaylistToastOpenState } from "../../../app/entities/global/atom";

const Number = styled.span<{ $isMine?: boolean }>`
  color: #fff;
  text-align: center;

  max-width: 20px;

  @media (max-width: 614px) {
    ${(props) =>
      !props.$isMine
        ? css`
            display: none;
          `
        : css`
            width: 20px;
            margin-right: 8px;
          `}
  }
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
  accent-color: ${(props) => props.theme.color.pink};

  @media (max-width: 614px) {
    width: 15px;
    height: 15px;
  }
`;

const Wrapper = styled.div<{
  $isLast: boolean;
  $isMine?: boolean;
  $isToastOpen: boolean;
}>`
  width: 100%;
  display: grid;
  grid-template-columns: 20px 35px 1fr;

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

@media (max-width: 614px) {
    display: flex;
    gap:8px;
  }
`;

const Image = styled.div<{ $img: string }>`
  background-image: ${(props) => (props.$img ? `url(${props.$img})` : "")};
  background-size: cover;
  background-position: center;
  height: 100%;
  border-radius: 5px;

  cursor: pointer;

  @media (max-width: 614px) {
    width: 40px;
    height: 40px;
  }
`;

const Info = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 6fr 7fr;
  align-items: center;
  column-gap: 8px;

  @media (max-width: 614px) {
    display: flex;
    flex-direction: column;
    width: auto;
    height: 100%;
    justify-content: space-between;
    font-size: 14px;
    gap: 4px;
  }
`;

const InfoHeader = styled.div`
  overflow: hidden;

  @media (max-width: 614px) {
    width: 100%;
  }
`;

const Title = styled.div`
  width: 100%;

  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    cursor: pointer;
  }
`;

const Divider = styled.span``;

const InfoSub = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr auto;
  width: 100%;
  align-items: center;
  column-gap: 5px;

  ${Divider} {
    display: none;
  }

  @media (max-width: 614px) {
    display: flex;

    ${Divider} {
      display: inline;
    }
  }
`;

const Artist = styled.span`
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Views = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Album = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
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
  const [views, setViews] = useState<number>(music?.counts?.views || 0);
  const checkboxInput = useRef<HTMLInputElement>(null);
  const [isPlaylistToastOpen, setIsPlaylistToastOpen] = useRecoilState(
    isPlaylistToastOpenState
  );

  const selectedMusic = useRecoilValue(selectedMusicState);

  const setPlaylistMusics = useSetRecoilState(playlistMusicsState);

  useEffect(() => {
    if (selectedMusic && selectedMusic._id === music._id) {
      setViews((prev) => prev + 1);
    }
  }, [selectedMusic, music._id]);

  useEffect(() => {
    if (checkboxInput.current && !isPlaylistToastOpen) {
      checkboxInput.current.checked = false;
    }
  }, [isPlaylistToastOpen]);

  useEffect(() => {
    if (!isMine) {
      setIsPlaylistToastOpen(false);
    }
  }, [isMine, setIsPlaylistToastOpen]);

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
        const newPlaylistMusicStateList = [...prev].map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              state: isChecked,
            };
          } else {
            return item;
          }
        });
        flag = newPlaylistMusicStateList.some((item) => item.state);
        return newPlaylistMusicStateList;
      });
      setIsPlaylistToastOpen(flag);
    }
  };

  return (
    <Wrapper
      key={music._id}
      $isLast={length === index + 1}
      $isMine={isMine}
      $isToastOpen={isPlaylistToastOpen}
    >
      <MaskDiv>
        <CheckBox
          type="checkbox"
          ref={checkboxInput}
          onChange={onChangeHandler}
        />
      </MaskDiv>
      <Number $isMine={isMine}>{index + 1}</Number>

      <Image $img={music.coverImg} onClick={clickViews} />
      <Info>
        <InfoHeader>
          <Title>
            <span onClick={clickViews}>{music.title}</span>
          </Title>
        </InfoHeader>
        <InfoSub>
          <Artist>
            <Link to={`/artists/${music.artists ? music.artists[0]._id : ""}`}>
              {music.artists ? music.artists[0].artistname : "알 수 없음"}
            </Link>
          </Artist>
          <Divider>•</Divider>
          <Views>{views}회</Views>
          <Divider>•</Divider>
          <Album>
            <Link to={`/albums/${music.album ? music.album._id : ""}`}>
              {music.album ? music.album.title : "알 수 없음"}
            </Link>
          </Album>
          <Divider>•</Divider>
          <Duration>{setMusicSeconds(music.duration)}</Duration>
        </InfoSub>
      </Info>
    </Wrapper>
  );
};

export default RowListMusicItem;
