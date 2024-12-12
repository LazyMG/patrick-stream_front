import { atom } from "recoil";

export const ytIdState = atom<string>({
  key: "ytIdState",
  default: "",
});

export const selectedMusicState = atom({
  key: "selectedMusicState",
  default: null,
});
