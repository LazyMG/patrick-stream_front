import { atom } from "recoil";
import { Album, APIAlbum } from "../../../shared/models/album";

export const albumsState = atom<Album[]>({
  key: "albumsState",
  default: [],
});

export const followingAlbumsState = atom<APIAlbum[] | null>({
  key: "followingAlbums",
  default: null,
});
