import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { useState } from "react";

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
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`;

const ItemViews = styled.span``;

const ItemDuration = styled.span`
  min-width: 30px;
`;

const AlbumList = ({ music, index }: { music: APIMusic; index: number }) => {
  const playMusic = usePlayMusic();
  const [views, setViews] = useState<number>(music.counts.views);

  const clickMusic = () => {
    playMusic(music);
    setViews((prev) => prev + 1);
  };

  return (
    <AlbumListItem>
      <ItemNumber>{index + 1}</ItemNumber>
      <ItemInfo>
        <ItemTitle onClick={clickMusic}>{music.title}</ItemTitle>
        <ItemViews>{views}회</ItemViews>
      </ItemInfo>
      <ItemDuration>{setMusicSeconds(music.duration)}</ItemDuration>
    </AlbumListItem>
  );
};

export default AlbumList;
