import { useSetRecoilState } from "recoil";
import {
  currentPlayerState,
  isPlayerOnState,
} from "../../app/entities/player/atom";
import { selectedMusicState, ytIdState } from "../../app/entities/music/atom";
import { APIMusic } from "../models/music";
import { useRecentMusics } from "./useRecentMusics";
import { updateMusicView } from "../lib/updateMusicView";

export const usePlayMusic = () => {
  const setIsPlayerOn = useSetRecoilState(isPlayerOnState);
  const setYtId = useSetRecoilState(ytIdState);
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const { addUserRecentMusics } = useRecentMusics();

  const playMusic = async (music: APIMusic) => {
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
    if (isSameMusic) return;

    setYtId(music.ytId);
    setIsPlayerOn(true);
    setCurrentPlayer((prev) => {
      return {
        ...prev,
        isPlaying: true,
      };
    });

    addUserRecentMusics(music);
    await updateMusicView(music);
  };

  return playMusic;
};
