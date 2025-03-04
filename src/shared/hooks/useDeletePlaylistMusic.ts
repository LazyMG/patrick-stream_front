import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import {
  currentUserPlaylistState,
  playlistMusicsState,
} from "../../app/entities/playlist/atom";
import { isPlaylistToastOpenState } from "../../app/entities/global/atom";
import { APIPlaylist } from "../models/playlist";
import { useToast } from "./useToast";

interface ICurrentUserPlaylist {
  isLoading: boolean;
  isError: boolean;
  playlist: APIPlaylist;
}

export const useDeletePlaylistMusic = () => {
  const user = useRecoilValue(userState);
  const loginUserData = useRecoilValue(loginUserDataState);
  const setPlaylistMusics = useSetRecoilState(playlistMusicsState);
  const setIsPlaylistToastOpen = useSetRecoilState(isPlaylistToastOpenState);
  const setcurrentUserPlaylist = useSetRecoilState(currentUserPlaylistState);
  const { setGlobalToast } = useToast();

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

    let temp: ICurrentUserPlaylist[] = [];

    setcurrentUserPlaylist((prev) => {
      if (!prev) return prev;

      temp = prev;
      const index = [...prev].findIndex(
        (item) => item.playlist._id === playlistId
      );
      if (index === -1) return prev;

      const targetPlaylist = prev[index];
      if (!targetPlaylist?.playlist.musics) return prev;

      const targetPlaylistMusics = targetPlaylist.playlist.musics.filter(
        (music) => !targetMusics.includes(music._id)
      );

      const updated = [...prev];

      updated[index] = {
        ...targetPlaylist,
        playlist: {
          ...updated[index].playlist,
          musics: targetPlaylistMusics,
        },
      };

      return updated;
    });

    const result = await fetch(`http://localhost:5000/playlist/${playlistId}`, {
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
    if (!result.ok) {
      setcurrentUserPlaylist(temp);
      if (!result.error) {
        if (result.type === "ERROR_ID") {
          setGlobalToast(
            "잘못된 데이터입니다.",
            "PLAYLIST_UPDATE_DATA_ID_ERROR"
          );
        } else if (result.type === "NO_DATA") {
          setGlobalToast(
            "데이터를 찾을 수 없습니다.",
            "PLAYLIST_UPDATE_NO_DATA_ERROR"
          );
        } else if (result.type === "NO_ACCESS") {
          setGlobalToast(
            "접근 권한이 없습니다.",
            "PLAYLIST_UPDATE_NO_ACCESS_ERROR"
          );
        }
      } else {
        setGlobalToast("DB 오류가 발생했습니다.", "ALBUM_FOLLOW_DB_ERROR");
      }
    }
  };

  return deletePlaylistMusic;
};
