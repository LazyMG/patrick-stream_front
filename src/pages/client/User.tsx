import styled, { keyframes } from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import RowList from "../../widgets/client/RowList";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import FlexList from "../../widgets/client/FlexList";
import { backgroundState } from "../../app/entities/global/atom";
import { APIUser } from "../../shared/models/user";
import {
  likedMusicsState,
  recentMusicsState,
} from "../../app/entities/music/atom";
import { followingArtistsState } from "../../app/entities/artist/atom";
import { followingAlbumsState } from "../../app/entities/album/atom";
import NotFound from "./NotFound";
import RowListSkeleton from "../../widgets/client/RowListSkeleton";
import { useLogout } from "../../shared/hooks/useLogout";
import { debounce } from "lodash";
import { useToast } from "../../shared/hooks/useToast";
import { APIPlaylist } from "../../shared/models/playlist";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const InfoContainer = styled.div`
  width: 100%;

  padding: 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
`;

const InfoProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoIcon = styled.div`
  svg {
    width: 180px;
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoName = styled.span`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
`;

const InfoContent = styled.p`
  font-size: 14px;
  color: #777777;
`;

const InfoButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Button = styled(DefaultButton)<{ $alter: boolean }>`
  color: ${(props) => (props.$alter ? "#fff" : "#000")};
  background-color: ${(props) => (props.$alter ? "#000" : " #fff")};

  font-size: 16px;

  padding: 5px 30px;

  border: 1px solid #fff;

  &:hover {
    background-color: ${(props) => (props.$alter ? "#282828" : " #c7c7c7")};
  }
`;

const FollowButton = styled(DefaultButton)<{ $follow: boolean }>`
  color: ${(props) => (props.$follow ? "#a988bd" : "#fff")};
  background-color: ${(props) => (props.$follow ? "transparent" : "#a988bd")};

  font-size: 16px;

  padding: 5px 30px;

  border: 1px solid #a988bd;

  transition: transform 0.1s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => (props.$follow ? "#a988bd" : "transparent")};
    color: ${(props) => (props.$follow ? "#fff" : "#a988bd")};
  }
`;

const pulseKeyframes = keyframes`
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0.4;
  }
  100%{
    opacity: 1;
  }
`;

const InfoTextSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const InfoNameSkeleton = styled.span`
  height: 40px;
  background-color: #2e2e2e;
  border-radius: 10px;

  width: 40%;
`;

const InfoContentSkeleton = styled.p`
  height: 20px;
  background-color: #2e2e2e;
  border-radius: 10px;

  width: 20%;
`;

const InfoButtonsSkeleton = styled.div`
  height: 32px;
  width: 20%;
  min-width: 180px;
  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const user = useRecoilValue(userState);
  const loginUserData = useRecoilValue(loginUserDataState);

  const [userData, setUserData] = useState<APIUser | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<APIPlaylist[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const setBackground = useSetRecoilState(backgroundState);
  const [follow, setFollow] = useState<boolean | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);

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
        setUserData(result.user);
        console.log(result.user.playlists);
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

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <Wrapper>
      <InfoContainer>
        <InfoProfile>
          <InfoIcon>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </InfoIcon>
          {!isLoading && userData ? (
            <InfoText>
              <InfoName>{userData.username}</InfoName>
              <InfoContent>{`팔로워 수: ${followers ?? 0}`}</InfoContent>
            </InfoText>
          ) : (
            <InfoTextSkeleton>
              <InfoNameSkeleton />
              <InfoContentSkeleton />
            </InfoTextSkeleton>
          )}
        </InfoProfile>
        {!isLoading ? (
          <InfoButtons>
            {userData && isMyPage ? (
              <>
                <Button $alter={false}>수정</Button>
                <Button onClick={logOut} $alter={true}>
                  로그아웃
                </Button>
              </>
            ) : follow !== null ? (
              <FollowButton $follow={follow} onClick={followUser}>
                {follow ? "언팔로우" : "팔로우"}
              </FollowButton>
            ) : (
              <InfoButtonsSkeleton />
            )}
          </InfoButtons>
        ) : (
          <InfoButtonsSkeleton />
        )}
      </InfoContainer>
      {isLoading && <RowListSkeleton />}
      {isMyPage && recentMusics && recentMusics?.length !== 0 && (
        <RowList
          title="최근 들은 음악"
          subTitle="공개"
          list={recentMusics}
          buttonFunc={() => navigate("/listen_again")}
        />
      )}
      {isMyPage && likedMusics && likedMusics.length !== 0 && (
        <RowList title="좋아요 한 음악" subTitle="공개" list={likedMusics} />
      )}
      {userPlaylists && userPlaylists.length !== 0 && (
        <FlexList
          list={userPlaylists}
          isCustom={false}
          listFlag="playlist"
          title="재생목록"
          isMore={true}
        />
      )}
      {isMyPage && followingArtists && followingArtists.length !== 0 && (
        <FlexList
          title="팔로우 한 아티스트"
          isCustom={false}
          listFlag="artist"
          list={followingArtists}
          isMore={true}
        />
      )}
      {isMyPage && followingAlbums && followingAlbums.length !== 0 && (
        <FlexList
          title="팔로우 한 앨범"
          isCustom={false}
          listFlag="album"
          list={followingAlbums}
          isMore={true}
        />
      )}
    </Wrapper>
  );
};

export default User;
