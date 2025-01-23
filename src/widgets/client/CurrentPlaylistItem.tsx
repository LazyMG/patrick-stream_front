import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import React from "react";
import { SetterOrUpdater } from "recoil";

const ListItemDuration = styled.div`
  color: #fff;
`;

const ListItemIcon = styled.svg`
  color: #fff;
  display: none;
  width: 30px;

  &:hover {
    color: #f5a3a5;
  }
`;

const ListItem = styled.div<{ $isSelectedMusic: boolean }>`
  width: 100%;
  min-height: 70px;

  padding: 5px 20px;
  box-sizing: border-box;

  cursor: pointer;

  &:hover {
    background-color: #4a4949;
  }

  ${(props) => (props.$isSelectedMusic ? `background-color: #4a4949` : "")};

  &:hover ${ListItemIcon} {
    display: flex;
  }

  &:hover ${ListItemDuration} {
    display: none;
  }
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

const CurrentPlaylistItem = ({
  music,
  isSelectedMusic,
  setPlayingPlaylist,
}: {
  music: APIMusic;
  isSelectedMusic: boolean;
  closeModal: () => void;
  setPlayingPlaylist: SetterOrUpdater<APIMusic[] | null>;
}) => {
  const playMusic = usePlayMusic();

  const musicPlay = () => {
    playMusic(music);
  };

  const deleteMusic = (event: React.MouseEvent<HTMLOrSVGElement>) => {
    event.stopPropagation();
    setPlayingPlaylist((prev) => {
      if (!prev) return prev;
      if (prev.some((item) => item._id === music._id)) {
        return prev.filter((item) => item._id !== music._id);
      } else {
        return prev;
      }
    });
  };

  return (
    <ListItem onClick={musicPlay} $isSelectedMusic={isSelectedMusic}>
      <ListItemContent>
        <ListItemImg src={music.coverImg} />
        <ListItemInfo>
          <ListItemDescription>
            <ListItemTitle>{music.title}</ListItemTitle>
            <ListItemArtist>
              {music.artists ? music.artists[0].artistname : "알 수 없음"}
            </ListItemArtist>
          </ListItemDescription>
          <ListItemDuration>{setMusicSeconds(music.duration)}</ListItemDuration>
          <ListItemIcon
            onClick={deleteMusic}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
            />
          </ListItemIcon>
        </ListItemInfo>
      </ListItemContent>
    </ListItem>
  );
};

export default CurrentPlaylistItem;
