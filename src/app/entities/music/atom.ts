import { atom } from "recoil";
import { APIMusic } from "../../../shared/models/music";

export const ytIdState = atom<string>({
  key: "ytIdState",
  default: "",
});

export const selectedMusicState = atom<APIMusic | null>({
  key: "selectedMusicState",
  default: null,
});

export const recentMusicsState = atom<APIMusic[] | null>({
  key: "recentMusicsState",
  default: null,
});
