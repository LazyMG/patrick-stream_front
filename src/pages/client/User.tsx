import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import RowList from "../../widgets/client/RowList";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import FlexList from "../../widgets/client/FlexList";
import { backgroundState } from "../../app/entities/global/atom";
import { APIUser } from "../../shared/models/user";
import { recentMusicsState } from "../../app/entities/music/atom";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;

  /* background-color: blue; */
`;

const InfoContainer = styled.div`
  width: 100%;

  padding: 30px 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
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

const Button = styled(DefaultButton)`
  color: #a988bd;
  background-color: #fff;

  font-size: 16px;

  padding: 5px 30px;

  &:hover {
    background-color: #c7c7c7;
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

const User = () => {
  const [user, setUser] = useRecoilState(userState);
  const { userId } = useParams();
  const [userData, setUserData] = useState<APIUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const setBackground = useSetRecoilState(backgroundState);
  const [recentMusics, setRecentMusics] = useRecoilState(recentMusicsState);
  const [loginUserData, setLoginUserData] = useRecoilState(loginUserDataState);
  const setCurrentUserPlaylist = useSetRecoilState(currentUserPlaylistState);
  const navigate = useNavigate();
  const [follow, setFollow] = useState(false);
  const [followers, setFollowers] = useState<number | null>(null);

  const isMyPage = userId !== undefined && user?.userId === userId;

  const currentFollowers = isMyPage
    ? loginUserData?.followers?.length ?? 0
    : userData?.followers?.length ?? 0;

  useEffect(() => {
    if (loginUserData) {
      const isFollow = loginUserData.followings?.followingUsers.some(
        (user) => user === userId
      );
      setFollow(!!isFollow);
    }
  }, [loginUserData, userId]);

  useEffect(() => {
    setFollowers((prev) => {
      if (prev === currentFollowers) return prev;
      return currentFollowers;
    });
  }, [currentFollowers]);

  const getUser = useCallback(
    async (id: string) => {
      if (user && user.userId === userId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      console.log("User get userdata");
      const result = await fetch(`http://localhost:5000/user/${id}`, {
        credentials: "include",
      }).then((res) => res.json());
      if (result.ok) {
        setUserData(result.user);
        setIsLoading(false);
        setRecentMusics(result.user.recentMusics);
      }
    },
    [setRecentMusics, userId, user]
  );

  useEffect(() => {
    if (userId && isLoading && !user.loading) {
      getUser(userId);
    }
  }, [userId, isLoading, getUser, loginUserData, user]);

  useEffect(() => {
    setBackground(null);
  }, [setBackground]);

  const logOut = async () => {
    const result = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) => res.json());
    if (result.ok) {
      setUser({ userId: "", loading: false });
      setLoginUserData(null);
      setRecentMusics(null);
      setCurrentUserPlaylist([]);
      navigate("/");
      console.log("로그아웃");
    }
  };

  const followUser = async () => {
    if (isMyPage || user.userId === "") return;
    if (follow) {
      setFollow(false);
      setFollowers((prev) => {
        if (prev) {
          return Math.max(prev - 1, 0);
        }
        return prev;
      });
      // 1. 로그인 한 사용자의 팔로잉 목록에서 제거
      // 2. 현재 페이지 사용자의 팔로워 목록에서 제거
      await fetch(`http://localhost:5000/user/${userId}/followers`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUserId: user.userId,
          addList: false,
        }),
      });
    } else {
      setFollow(true);
      setFollowers((prev) => {
        if (prev !== null) {
          return prev + 1;
        }
        return prev;
      });
      // 1. 로그인 한 사용자의 팔로잉 목록에 추가
      // 2. 현재 페이지 사용자의 팔로워 목록에 추가
      await fetch(`http://localhost:5000/user/${userId}/followers`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUserId: user.userId,
          addList: true,
        }),
      });
    }
  };

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
          <InfoText>
            {(isMyPage || userData) && (
              <>
                <InfoName>
                  {isMyPage ? loginUserData?.username : userData?.username}
                </InfoName>
                <InfoContent>팔로워 수: {followers}</InfoContent>
              </>
            )}
          </InfoText>
        </InfoProfile>
        {!isLoading && !user.loading && (
          <InfoButtons>
            {isMyPage ? (
              <>
                <Button>수정</Button>
                <Button onClick={logOut}>로그아웃</Button>
              </>
            ) : follow ? (
              <FollowButton $follow={follow} onClick={followUser}>
                {follow ? "언팔로우" : "팔로우"}
              </FollowButton>
            ) : (
              <div>Loading...</div>
            )}
          </InfoButtons>
        )}
      </InfoContainer>
      <RowList title="최근 들은 음악" subTitle="공개" />
      <FlexList title="반복 감상한 아티스트" isCustom={false} />
    </Wrapper>
  );
};

export default User;
