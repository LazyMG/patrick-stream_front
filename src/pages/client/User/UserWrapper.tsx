import { Outlet, useNavigate, useParams } from "react-router-dom";
import { loginUserDataState, userState } from "../../../app/entities/user/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback, useEffect, useMemo, useState } from "react";
import { APIUser } from "../../../shared/models/user";
import { APIPlaylist } from "../../../shared/models/playlist";
import { backgroundState } from "../../../app/entities/global/atom";
import {
  likedMusicsState,
  recentMusicsState,
} from "../../../app/entities/music/atom";
import { currentUserPlaylistState } from "../../../app/entities/playlist/atom";
import { followingArtistsState } from "../../../app/entities/artist/atom";
import { followingAlbumsState } from "../../../app/entities/album/atom";
import { useLogout } from "../../../shared/hooks/useLogout";
import { useToast } from "../../../shared/hooks/useToast";
import { debounce } from "lodash";
import NotFoundComponent from "../../../widgets/NotFoundComponent";

const UserWrapper = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const user = useRecoilValue(userState);
  const loginUserData = useRecoilValue(loginUserDataState);

  const [userData, setUserData] = useState<APIUser | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<APIPlaylist[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [follow, setFollow] = useState<boolean | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const setBackground = useSetRecoilState(backgroundState);

  const likedMusics = useRecoilValue(likedMusicsState);
  const recentMusics = useRecoilValue(recentMusicsState);
  const currentPlaylist = useRecoilValue(currentUserPlaylistState);
  const followingArtists = useRecoilValue(followingArtistsState);
  const followingAlbums = useRecoilValue(followingAlbumsState);

  const { cleanUserInfo } = useLogout();
  const { setGlobalToast } = useToast();

  const isMyPage = userId !== undefined && user.userId === userId;

  useEffect(() => {
    const currentUserInfo = isMyPage ? loginUserData : userData;
    if (currentUserInfo) {
      const followerCount = currentUserInfo.followers?.length ?? 0;
      setFollowers(followerCount);

      if (!isMyPage && loginUserData) {
        const isFollow = loginUserData.followings?.followingUsers.some(
          (user) => user === currentUserInfo._id
        );
        setFollow(!!isFollow);
      } else {
        setFollow(null);
      }
    }
  }, [isMyPage, userData, loginUserData]);

  const getUser = useCallback(
    async (targetId: string) => {
      if (isError) return;
      const result = await fetch(`http://localhost:5000/user/${targetId}`, {
        credentials: "include",
      }).then((res) => res.json());

      if (result.ok) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setUserData(result.user);
        setUserPlaylists(result.user.playlists);
        setIsLoading(false);
      } else {
        if (!result.error) {
          setIsNotFound(true);
        } else {
          setGlobalToast("User Error", "USER_DATA_FETCH_ERROR");
          setIsError(true);
          setIsLoading(false);
        }
      }
    },
    [setGlobalToast, isError]
  );

  useEffect(() => {
    setIsNotFound(false);
  }, [userId]);

  useEffect(() => {
    setBackground(null);
    setIsError(false);

    // 1) 자기 페이지면 -> fetch 안 함
    if (isMyPage) {
      if (loginUserData) {
        setUserData(loginUserData);
        setUserPlaylists(currentPlaylist);
      }
      setIsLoading(false);
      return;
    }

    // 2) userData가 없고 userId가 있으면 fetch
    if (!userData && userId && !user.loading) {
      getUser(userId);
    }
  }, [isMyPage, loginUserData, setBackground, userData, userId, user.loading]);

  const logOut = async () => {
    const result = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) => res.json());
    if (result.ok) {
      cleanUserInfo();
      navigate("/");
    }
  };

  const patchUserFollowers = useCallback(
    async (addList: boolean) => {
      await fetch(`http://localhost:5000/user/${userId}/followers`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeUserId: user.userId,
          addList,
        }),
      });
    },
    [userId, user.userId]
  );

  const debouncedFollowUser = useMemo(
    () => debounce((addList) => patchUserFollowers(addList), 200),
    [patchUserFollowers]
  );

  const followUser = async () => {
    if (!userId || isMyPage || user.userId === "" || follow === null) return;

    const addList = !follow;
    setFollow(addList);
    setFollowers((prev) => {
      if (prev === null) return prev;
      return addList ? prev + 1 : Math.max(prev - 1, 0);
    });

    debouncedFollowUser(addList);
  };

  const moreButton = () => {
    navigate("/listen_again");
  };

  const followingPage = () => {
    navigate("followings");
  };

  if (isNotFound) {
    return <NotFoundComponent />;
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  return (
    <Outlet
      context={{
        isLoading,
        userData,
        followers,
        isMyPage,
        logOut,
        follow,
        followUser,
        recentMusics,
        likedMusics,
        userPlaylists,
        followingArtists,
        followingAlbums,
        moreButton,
        followingPage,
        isEditModalOpen,
        openEditModal,
        closeEditModal,
      }}
    />
  );
};

export default UserWrapper;
