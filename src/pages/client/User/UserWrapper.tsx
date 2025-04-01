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
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

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
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/user/${targetId}`,
        {
          credentials: "include",
        }
      ).then((res) => res.json());

      if (result.ok) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setUserData(result.user);
        setUserPlaylists(result.user.playlists);
        setIsLoading(false);
      } else {
        if (!result.error) {
          if (result.type === "ERROR_ID") {
            setGlobalToast("잘못된 데이터입니다.", "USER_ERROR_ID_ERROR");
          } else if (result.type === "NO_DATA") {
            setGlobalToast("데이터가 존재하지 않습니다.", "USER_NO_DATA_ERROR");
          }
        } else {
          setGlobalToast("일시적인 오류입니다.", "USER_DB_ERROR");
          // setIsError(true);
          // setIsLoading(false);
        }
        setIsNotFound(true);
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
        setUserPlaylists(
          currentPlaylist ? currentPlaylist.map((item) => item.playlist) : []
        );
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
    setIsLogoutLoading(true);
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    ).then((res) => res.json());
    if (result.ok) {
      cleanUserInfo();
      navigate("/");
    }
    setIsLogoutLoading(false);
  };

  const patchUserFollowers = useCallback(
    async (addList: boolean) => {
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/user/${userId}/followers`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            activeUserId: user.userId,
            addList,
          }),
        }
      ).then((res) => res.json());
      if (!result.ok) {
        if (!result.error) {
          if (result.type === "ERROR_ID") {
            setGlobalToast("잘못된 데이터입니다.", "USER_FOLLOW_DATA_ID_ERROR");
          } else if (result.type === "NO_DATA") {
            setGlobalToast(
              "데이터를 찾을 수 없습니다.",
              "USER_FOLLOW_NO_DATA_ERROR"
            );
          }
        } else {
          setGlobalToast("일시적인 오류입니다.", "USER_FOLLOW_DB_ERROR");
        }
        setFollow(!addList);
        setFollowers((prev) => {
          if (prev === null) return prev;
          return addList ? Math.max(prev - 1, 0) : prev + 1;
        });
      }
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
        isLogoutLoading,
      }}
    />
  );
};

export default UserWrapper;
