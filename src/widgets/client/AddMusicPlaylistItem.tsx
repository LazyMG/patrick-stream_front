import styled from "styled-components";
import { APIPlaylist } from "../../shared/models/playlist";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedMusicState } from "../../app/entities/music/atom";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";
import { useToast } from "../../shared/hooks/useToast";

const ListItem = styled.div`
  width: 100%;
  min-height: 70px;
  /* background-color: beige; */

  padding: 5px 20px;
  box-sizing: border-box;

  cursor: pointer;

  &:hover {
    background-color: #4a4949;
  }
`;

const ListItemContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const ListItemImg = styled.div`
  width: 60px;
  aspect-ratio: 1 / 1;

  color: #fff;
`;

const ListItemInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ListItemTitle = styled.span`
  color: #fff;
  font-weight: 600;
`;

const ListItemLength = styled.span`
  color: #fff;
`;

interface ICurrentUserPlaylist {
  isLoading: boolean;
  isError: boolean;
  playlist: APIPlaylist;
}

const AddMusicPlaylistItem = ({
  currentPlaylist,
  closeModal,
}: {
  currentPlaylist: APIPlaylist;
  closeModal: () => void;
}) => {
  const selectedMusic = useRecoilValue(selectedMusicState);
  const setCurrentUserPlaylist = useSetRecoilState(currentUserPlaylistState);
  const { setGlobalToast } = useToast();

  const clickAddMusic = async () => {
    if (!selectedMusic) return;

    let isAlreadyExistMusic = false;
    let temp: ICurrentUserPlaylist[] = [];
    setCurrentUserPlaylist((prev) => {
      if (!prev) return prev;
      temp = prev;
      return prev.map((item) => {
        if (item.playlist._id !== currentPlaylist._id) {
          return {
            ...item,
          };
        }

        if (!item.playlist.musics) {
          return {
            ...item,
          };
        }

        isAlreadyExistMusic = item.playlist.musics.some(
          (music) => music._id === selectedMusic._id
        );
        if (isAlreadyExistMusic)
          return {
            ...item,
          };

        return {
          ...item,
          playlist: {
            ...currentPlaylist,
            musics: [...item.playlist.musics, selectedMusic],
          },
        };
      });
    });

    if (isAlreadyExistMusic) {
      //alert 수정 필요
      alert("이미 존재하는 음악입니다.");
      return;
    }

    closeModal();

    const result = await fetch(
      `http://localhost:5000/playlist/${currentPlaylist._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          musicId: selectedMusic._id,
          addMusic: true,
        }),
        credentials: "include",
      }
    ).then((res) => res.json());
    if (!result.ok) {
      if (!result.error) {
        if (result.type === "ERROR_ID") {
          setGlobalToast("잘못된 데이터입니다.", "PLAYLIST_MUSIC_ADD_ERROR_ID");
        } else if (result.type === "NO_DATA") {
          setGlobalToast(
            "데이터가 존재하지 않습니다.",
            "PLAYLIST_MUSIC_ADD_NO_DATA"
          );
        } else if (result.type === "NO_ACCESS") {
          setGlobalToast(
            "접근 권한이 없습니다.",
            "PLAYLIST_MUSIC_ADD_NO_ACCESS"
          );
        }
      } else {
        setGlobalToast("DB Error", "PLAYLIST_MUSIC_ADD_DB_ERROR");
      }
      setCurrentUserPlaylist(temp);
    }
  };

  return (
    <ListItem onClick={clickAddMusic}>
      <ListItemContent>
        <ListItemImg>
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
          </svg>
        </ListItemImg>
        <ListItemInfo>
          <ListItemTitle>{currentPlaylist.title}</ListItemTitle>
          <ListItemLength>
            {currentPlaylist.musics?.length ?? 0}개
          </ListItemLength>
        </ListItemInfo>
      </ListItemContent>
    </ListItem>
  );
};

export default AddMusicPlaylistItem;
