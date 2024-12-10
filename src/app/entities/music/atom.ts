import { atom } from "recoil";

export const playingState = atom<number>({
  key: "playingState",
  default: -1,
});

export const ytIdState = atom<string>({
  key: "ytIdState",
  default: "",
});
