import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";

const ListItem = styled.div<{ $isSelectedMusic: boolean }>`
  width: 100%;
  min-height: 70px;
  /* background-color: beige; */

  padding: 5px 20px;
  box-sizing: border-box;

  cursor: pointer;

  &:hover {
    background-color: #4a4949;
  }

  ${(props) => (props.$isSelectedMusic ? `background-color: #4a4949` : "")};
`;

const ListItemContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const ListItemImg = styled.img`
  width: 60px;
  aspect-ratio: 1 / 1;
  background-color: #212121;
  border-radius: 5px;
`;

const ListItemInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListItemDescription = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ListItemTitle = styled.span`
  color: #fff;
  font-weight: 600;
`;

const ListItemArtist = styled.span`
  color: #fff;
`;

const ListItemDuration = styled.div`
  color: #fff;
`;

const CurrentPlaylistItem = ({
  music,
  isSelectedMusic,
}: {
  music: APIMusic;
  isSelectedMusic: boolean;
  closeModal: () => void;
}) => {
  const playMusic = usePlayMusic();

  const musicPlay = () => {
    playMusic(music);
  };

  return (
    <ListItem onClick={musicPlay} $isSelectedMusic={isSelectedMusic}>
      <ListItemContent>
        <ListItemImg src={music.coverImg} />
        <ListItemInfo>
          <ListItemDescription>
            <ListItemTitle>{music.title}</ListItemTitle>
            <ListItemArtist>{music.artists[0].artistname}</ListItemArtist>
          </ListItemDescription>
          <ListItemDuration>{setMusicSeconds(music.duration)}</ListItemDuration>
        </ListItemInfo>
      </ListItemContent>
    </ListItem>
  );
};

export default CurrentPlaylistItem;
