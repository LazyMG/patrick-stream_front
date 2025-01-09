import { atom } from "recoil";
import { APIMusic } from "../../../shared/models/music";

interface IYtId {
  ytId: string;
  stamp: number;
}

export const ytIdState = atom<IYtId>({
  key: "ytIdState",
  default: {
    ytId: "",
    stamp: Date.now(),
  },
});

export const selectedMusicState = atom<APIMusic | null>({
  key: "selectedMusicState",
  default: null,
});

export const likedMusicsState = atom<APIMusic[] | null>({
  key: "likedMusicsState",
  default: null,
});

export const recentMusicsState = atom<APIMusic[] | null>({
  key: "recentMusicsState",
  default: null,
});

export const playingPlaylistState = atom<APIMusic[] | null>({
  key: "playlistState",
  default: null,
});
