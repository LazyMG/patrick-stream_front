import { atom } from "recoil";
import { APIPlaylist } from "../../../shared/models/playlist";
import { APIMusic } from "../../../shared/models/music";

export const currentUserPlaylistState = atom<APIPlaylist[]>({
  key: "currentUserPlaylistState",
  default: [],
});

interface IPlaylistMusics {
  musics: APIMusic[];
  states: boolean[];
}

export const playlistMusicsState = atom<IPlaylistMusics | null>({
  key: "playlistMusicsState",
  default: null,
});
