import { useSetRecoilState } from "recoil";
import {
  currentPlayerState,
  isPlayerOnState,
} from "../../app/entities/player/atom";
import { selectedMusicState, ytIdState } from "../../app/entities/music/atom";
import { APIMusic } from "../models/music";
import { useRecentMusics } from "./useRecentMusics";

export const usePlayMusic = () => {
  const setIsPlayerOn = useSetRecoilState(isPlayerOnState);
  const setYtId = useSetRecoilState(ytIdState);
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const { addUserRecentMusics } = useRecentMusics();

  const playMusic = (music: APIMusic) => {
    setYtId(music.ytId);
    setIsPlayerOn(true);
    setCurrentPlayer((prev) => {
      return {
        ...prev,
        isPlaying: true,
      };
    });
    setSelectedMusic(music);
    addUserRecentMusics(music);
  };

  return playMusic;
};
