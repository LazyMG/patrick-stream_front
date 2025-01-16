import { useSetRecoilState } from "recoil";
import {
  likedMusicsState,
  recentMusicsState,
} from "../../app/entities/music/atom";
import { followingAlbumsState } from "../../app/entities/album/atom";
import {
  currentUserPlaylistState,
  followingPlaylistsState,
} from "../../app/entities/playlist/atom";
import { followingArtistsState } from "../../app/entities/artist/atom";
import { loginUserDataState, userState } from "../../app/entities/user/atom";

export const useLogout = () => {
  const setLikedMusics = useSetRecoilState(likedMusicsState);
  const setRecentMusics = useSetRecoilState(recentMusicsState);
  const setFollowingArtists = useSetRecoilState(followingArtistsState);
  const setFollowingAlbums = useSetRecoilState(followingAlbumsState);
  const setFollowingPlaylists = useSetRecoilState(followingPlaylistsState);
  const setCurrentUserPlaylist = useSetRecoilState(currentUserPlaylistState);
  const setLoginUserData = useSetRecoilState(loginUserDataState);
  const setUser = useSetRecoilState(userState);

  const cleanUserInfo = () => {
    setLikedMusics(null);
    setRecentMusics(null);
    setFollowingArtists(null);
    setFollowingAlbums(null);
    setFollowingPlaylists(null);
    setUser({ userId: "", loading: false });
    setLoginUserData(null);
    setCurrentUserPlaylist([]);
  };

  return { cleanUserInfo };
};
