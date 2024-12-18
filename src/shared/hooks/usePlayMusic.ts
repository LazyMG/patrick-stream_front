import { useSetRecoilState } from "recoil";
import {
  currentPlayerState,
  isPlayerOnState,
} from "../../app/entities/player/atom";
import { ytIdState } from "../../app/entities/music/atom";

export const usePlayMusic = () => {
  const setIsPlayerOn = useSetRecoilState(isPlayerOnState);
  const setYtId = useSetRecoilState(ytIdState);
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);

  const playMusic = (ytId: string) => {
    setYtId(ytId);
    setIsPlayerOn(true);
    setCurrentPlayer((prev) => {
      return {
        ...prev,
        isPlaying: true,
      };
    });
  };

  return playMusic;
};
