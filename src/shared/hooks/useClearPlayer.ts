import { useSetRecoilState } from "recoil";
import {
  currentPlayerState,
  isPlayerOnState,
  playerInstanceAtom,
  ytPlayerState,
} from "../../app/entities/player/atom";
import { selectedMusicState, ytIdState } from "../../app/entities/music/atom";

export const useClearPlayer = () => {
  const setPlayer = useSetRecoilState(playerInstanceAtom);
  const setIsPlayerOn = useSetRecoilState(isPlayerOnState);
  const setYtId = useSetRecoilState(ytIdState);
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const setYtPlayer = useSetRecoilState(ytPlayerState);

  const clearPlayer = () => {
    setCurrentPlayer((prev) => {
      if (!prev) return prev;
      return {
        isPlaying: false,
        isEnd: false,
        isPaused: false,
        isLoading: true,
        isMuted: false,
        isRedirectPaused: false,
        volume: 50,
      };
    });
    setPlayer(null);
    setIsPlayerOn(false);
    setYtId({ ytId: "", stamp: Date.now() });
    setSelectedMusic(null);
    setYtPlayer(-1);
  };

  return clearPlayer;
};
