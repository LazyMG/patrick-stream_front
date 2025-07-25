import { useSetRecoilState } from "recoil";
import { isPlayerOnState } from "../../app/entities/player/atom";
import {
  playingPlaylistState,
  selectedMusicState,
  ytIdState,
} from "../../app/entities/music/atom";
import { APIMusic } from "../models/music";
import { useRecentMusics } from "./useRecentMusics";
import { updateMusicView } from "../lib/updateMusicView";
import { useToast } from "./useToast";

export const usePlayMusic = () => {
  const setIsPlayerOn = useSetRecoilState(isPlayerOnState);
  const setYtId = useSetRecoilState(ytIdState);
  // const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
  const { addUserRecentMusics } = useRecentMusics();
  const { setGlobalToast } = useToast();

  const playMusic = async (music: APIMusic, noSame = false) => {
    let isSameMusic = false;
    setSelectedMusic((prev) => {
      if (prev && prev._id === music._id) {
        isSameMusic = true;
        return prev;
      }
      const newMusic = {
        ...music,
        counts: {
          likes: music.counts.likes,
          views: music.counts.views + 1,
        },
      };
      return newMusic;
    });

    if (!noSame && isSameMusic) return;

    setYtId((prev) => {
      return {
        stamp: noSame ? Date.now() : prev.stamp,
        ytId: music.ytId,
      };
    });
    setPlayingPlaylist((prev) => {
      if (!prev) return prev;
      const index = prev.findIndex((item) => item._id === music._id);
      if (index === -1) {
        return [music, ...prev];
      }
      return prev;
    });
    setIsPlayerOn(true);
    // setCurrentPlayer((prev) => {
    //   return {
    //     ...prev,
    //     isPlaying: true,
    //   };
    // });

    addUserRecentMusics(music);
    const updateResult = await updateMusicView(music);
    if (updateResult.error) {
      setGlobalToast("Music Error", updateResult.text);
    }
  };

  return playMusic;
};
