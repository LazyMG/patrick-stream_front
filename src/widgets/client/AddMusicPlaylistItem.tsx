import styled from "styled-components";
import { APIPlaylist } from "../../shared/models/playlist";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedMusicState } from "../../app/entities/music/atom";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";

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

const AddMusicPlaylistItem = ({
  playlist,
  closeModal,
}: {
  playlist: APIPlaylist;
  closeModal: () => void;
}) => {
  const selectedMusic = useRecoilValue(selectedMusicState);
  const setCurrentUserPlaylist = useSetRecoilState(currentUserPlaylistState);

  const clickAddMusic = async () => {
    if (!selectedMusic) return;

    let isAlreadyExistMusic = false;

    setCurrentUserPlaylist((prev) => {
      if (!prev) return prev;

      return prev.map((p) => {
        if (p._id !== playlist._id) {
          return p;
        }

        if (!p.musics) {
          return p;
        }

        isAlreadyExistMusic = p.musics.some((m) => m._id === selectedMusic._id);
        if (isAlreadyExistMusic) return p;

        return {
          ...p,
          musics: [...p.musics, selectedMusic],
        };
      });
    });

    if (isAlreadyExistMusic) {
      //alert 수정 필요
      alert("이미 존재하는 음악입니다.");
      return;
    }

    const result = await fetch(
      `http://localhost:5000/playlist/${playlist._id}`,
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
    if (result.ok) {
      closeModal();
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
          <ListItemTitle>{playlist.title}</ListItemTitle>
          <ListItemLength>{playlist.musics?.length ?? 0}개</ListItemLength>
        </ListItemInfo>
      </ListItemContent>
    </ListItem>
  );
};

export default AddMusicPlaylistItem;
