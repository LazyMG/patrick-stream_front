import { atom } from "recoil";
import { APIArtist } from "../../../shared/models/artist";

export const followingArtistsState = atom<APIArtist[] | null>({
  key: "followingArtistsState",
  default: null,
});
