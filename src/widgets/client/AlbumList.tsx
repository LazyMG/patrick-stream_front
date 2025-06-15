import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import { useEffect, useState } from "react";
import { selectedMusicState } from "../../app/entities/music/atom";
import { useRecoilValue } from "recoil";

const AlbumListItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  align-items: center;
  height: 50px;
  column-gap: 4px;
`;

const ItemNumber = styled.span`
  text-align: center;
  min-width: 30px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  overflow: hidden;
`;

const ItemTitle = styled.span`
  font-weight: bold;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;

  span {
    cursor: pointer;
  }
`;

const ItemViews = styled.span``;

const ItemDuration = styled.span`
  min-width: 30px;
`;

const AlbumList = ({ music, index }: { music: APIMusic; index: number }) => {
  const playMusic = usePlayMusic();
  const [views, setViews] = useState<number>(music?.counts.views || 0);
  const selectedMusic = useRecoilValue(selectedMusicState);

  useEffect(() => {
    if (selectedMusic && selectedMusic._id === music._id) {
      setViews((prev) => prev + 1);
    }
  }, [selectedMusic, music._id]);

  const clickMusic = () => {
    playMusic(music);
    // setViews((prev) => prev + 1);
  };

  return (
    <AlbumListItem>
      <ItemNumber>{index + 1}</ItemNumber>
      <ItemInfo>
        <ItemTitle>
          <span onClick={clickMusic}>{music.title}</span>
        </ItemTitle>
        <ItemViews>{views}회</ItemViews>
      </ItemInfo>
      <ItemDuration>{setMusicSeconds(music.duration)}</ItemDuration>
    </AlbumListItem>
  );
};

export default AlbumList;
