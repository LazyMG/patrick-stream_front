import { atom } from "recoil";
import { APIPlaylist } from "../../../shared/models/playlist";

export const currentUserPlaylistState = atom<APIPlaylist[]>({
  key: "currentUserPlaylistState",
  default: [],
});
