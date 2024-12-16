import { atom } from "recoil";
import { APIUserPlaylist } from "../../shared/models/playlist";

export const currentUserPlaylistState = atom<APIUserPlaylist[]>({
  key: "currentUserPlaylistState",
  default: [],
});
