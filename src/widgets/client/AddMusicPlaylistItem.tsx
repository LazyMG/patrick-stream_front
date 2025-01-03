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
  background-color: #212121;
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

    const addMusic = true;

    const result = await fetch(
      `http://localhost:5000/playlist/${playlist._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          musicId: selectedMusic._id,
          addMusic,
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
        <ListItemImg />
        <ListItemInfo>
          <ListItemTitle>{playlist.title}</ListItemTitle>
          <ListItemLength>{playlist.musics?.length ?? 0}개</ListItemLength>
        </ListItemInfo>
      </ListItemContent>
    </ListItem>
  );
};

export default AddMusicPlaylistItem;
