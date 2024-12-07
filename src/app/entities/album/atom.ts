import { atom } from "recoil";
import { Album } from "../../../shared/models/album";

export const albumsState = atom<Album[]>({
  key: "albumsState",
  default: [],
});
