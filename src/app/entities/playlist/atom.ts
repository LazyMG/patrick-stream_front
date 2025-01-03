import { atom } from "recoil";
import { APIPlaylist } from "../../../shared/models/playlist";
import { APIMusic } from "../../../shared/models/music";

export const currentUserPlaylistState = atom<APIPlaylist[]>({
  key: "currentUserPlaylistState",
  default: [],
});

interface IPlaylistMusic {
  music: APIMusic;
  state: boolean;
}

export const playlistMusicsState = atom<IPlaylistMusic[] | null>({
  key: "playlistMusicsState",
  default: null,
});
