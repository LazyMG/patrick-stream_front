import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import { playlistMusicsState } from "../../app/entities/playlist/atom";

export const useDeletePlaylistMusic = () => {
  const user = useRecoilValue(userState);
  const loginUserData = useRecoilValue(loginUserDataState);
  const setPlaylistMusics = useSetRecoilState(playlistMusicsState);

  if (user?.userId === "" || !loginUserData) return;

  const deletePlaylistMusic = () => {
    setPlaylistMusics((prev) => {
      if (!prev) return prev;
      const deleteMusic = [] as number[];
      prev.states.forEach((state, index) => {
        if (state === true) {
          deleteMusic.push(index);
        }
      });

      console.log(deleteMusic);
      return prev;
    });
  };

  return deletePlaylistMusic;
};
