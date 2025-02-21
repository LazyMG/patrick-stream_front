import { atom } from "recoil";
import { APIPlaylist } from "../../../shared/models/playlist";
import { APIMusic } from "../../../shared/models/music";

interface ICurrentUserPlaylist {
  isLoading: boolean;
  isError: boolean;
  playlist: APIPlaylist;
}

export const currentUserPlaylistState = atom<ICurrentUserPlaylist[] | null>({
  key: "currentUserPlaylistState",
  default: null,
});

interface IPlaylistMusic {
  music: APIMusic;
  state: boolean;
}

export const playlistMusicsState = atom<IPlaylistMusic[] | null>({
  key: "playlistMusicsState",
  default: null,
});

export const followingPlaylistsState = atom<APIPlaylist[] | null>({
  key: "followingPlaylistsState",
  default: null,
});
