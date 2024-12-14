import { atom } from "recoil";

interface APIUserPlaylist {
  id: string;
  title: string;
  duration: number;
  introduction: string;
  followersCount: number;
}

export const currentUserPlaylistState = atom<APIUserPlaylist[]>({
  key: "currentUserPlaylistState",
  default: [],
});
