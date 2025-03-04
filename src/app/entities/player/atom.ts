import { atom } from "recoil";

export const ytPlayerState = atom<number>({
  key: "ytPlayerState",
  default: -1,
});

interface Player {
  isPlaying: boolean;
  isLoading: boolean;
  isPaused: boolean;
  isEnd: boolean;
  isMuted: boolean;
  isRedirectPaused: boolean;
  volume: number;
}

export const currentPlayerState = atom<Player>({
  key: "currentPlayerState",
  default: {
    isPlaying: false,
    isEnd: false,
    isPaused: false,
    isLoading: true,
    isMuted: false,
    isRedirectPaused: false,
    volume: 50,
  },
});

export const isPlayerOnState = atom<boolean>({
  key: "isPlayerOnState",
  default: false,
});
