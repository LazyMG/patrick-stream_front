import { useSetRecoilState } from "recoil";
import {
  likedMusicsState,
  recentMusicsState,
} from "../../app/entities/music/atom";
import { followingArtistsState } from "../../app/entities/artist/atom";
import { followingAlbumsState } from "../../app/entities/album/atom";
import { followingPlaylistsState } from "../../app/entities/playlist/atom";
import { APIUser } from "../models/user";

export const useLoginUser = () => {
  const setLikedMusics = useSetRecoilState(likedMusicsState);
  const setRecentMusics = useSetRecoilState(recentMusicsState);
  const setFollowingArtists = useSetRecoilState(followingArtistsState);
  const setFollowingAlbums = useSetRecoilState(followingAlbumsState);
  const setFollowingPlaylists = useSetRecoilState(followingPlaylistsState);

  const initiateLoginUserData = (loginUser: APIUser) => {
    setRecentMusics(loginUser.recentMusics ? loginUser.recentMusics : []);
    setLikedMusics(loginUser.likedMusics ? loginUser.likedMusics : []);
    setFollowingArtists(
      loginUser?.followings?.followingArtists
        ? loginUser.followings.followingArtists
        : []
    );
    setFollowingAlbums(
      loginUser?.followings?.followingAlbums
        ? loginUser.followings.followingAlbums
        : []
    );
    setFollowingPlaylists(
      loginUser?.followings?.followingPlaylists
        ? loginUser.followings.followingPlaylists
        : []
    );
  };

  return { initiateLoginUserData };
};
