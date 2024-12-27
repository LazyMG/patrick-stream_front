import { atom, selector } from "recoil";
import { loginUserDataState } from "../user/atom";
import { APIArtist } from "../../../shared/models/artist";

export const followingArtistsState = atom<APIArtist[] | null>({
  key: "followingArtistsState",
  default: null,
});

interface FollowingProp {
  loading: boolean;
  artists: APIArtist[] | null;
}

export const followingArtistsSelector = selector<FollowingProp>({
  key: "followingArtistsSelector",
  get: ({ get }) => {
    const loginUserData = get(loginUserDataState);
    const followingArtists = loginUserData?.followings?.followingArtists;

    if (!followingArtists) {
      return { loading: true, artists: null };
    }
    if (followingArtists.length == 0) {
      return { loading: false, artists: null };
    }

    return { loading: false, artists: followingArtists };
  },
});
