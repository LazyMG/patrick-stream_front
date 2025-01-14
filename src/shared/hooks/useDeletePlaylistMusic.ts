import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import {
  currentUserPlaylistState,
  playlistMusicsState,
} from "../../app/entities/playlist/atom";
import { isPlaylistToastOpenState } from "../../app/entities/global/atom";

export const useDeletePlaylistMusic = () => {
  const user = useRecoilValue(userState);
  const loginUserData = useRecoilValue(loginUserDataState);
  const setPlaylistMusics = useSetRecoilState(playlistMusicsState);
  const setIsPlaylistToastOpen = useSetRecoilState(isPlaylistToastOpenState);
  const setcurrentUserPlaylist = useSetRecoilState(currentUserPlaylistState);

  const deletePlaylistMusic = async (playlistId: string) => {
    if (user?.userId === "" || !loginUserData) return;

    let targetMusics = [] as string[];
    setPlaylistMusics((prev) => {
      if (!prev) return prev;
      targetMusics = [...prev].reduce((acc, cur) => {
        if (cur.state) {
          acc.push(cur.music._id);
        }
        return acc;
      }, [] as string[]);
      return [...prev].filter((item) => !item.state);
    });

    setIsPlaylistToastOpen(false);

    if (targetMusics.length === 0) return;

    setcurrentUserPlaylist((prev) => {
      if (!prev) return prev;

      const index = [...prev].findIndex(
        (playlist) => playlist._id === playlistId
      );
      if (index === -1) return prev;

      const targetPlaylist = prev[index];
      if (!targetPlaylist?.musics) return prev;

      const targetPlaylistMusics = targetPlaylist.musics.filter(
        (music) => !targetMusics.includes(music._id)
      );

      const updated = [...prev];

      updated[index] = {
        ...targetPlaylist,
        musics: targetPlaylistMusics,
      };

      return updated;
    });

    await fetch(`http://localhost:5000/playlist/${playlistId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        musicId: targetMusics,
        addList: false,
      }),
      credentials: "include",
    }).then((res) => res.json());
  };

  return deletePlaylistMusic;
};
