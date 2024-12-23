import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import RowList from "../../widgets/client/RowList";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../../app/entities/user/atom";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import FlexList from "../../widgets/client/FlexList";
import { backgroundState } from "../../app/entities/global/atom";
import { APIUser } from "../../shared/models/user";
import { recentMusicsState } from "../../app/entities/music/atom";

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

const FollowButton = styled(DefaultButton)`
  color: #fff;

  font-size: 16px;

  background-color: blue;
  padding: 5px 30px;
`;

const User = () => {
  const [user, setUser] = useRecoilState(userState);
  const { userId } = useParams();
  const [isMyPage, setIsMyPage] = useState(false);
  const [userData, setUserData] = useState<APIUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const setBackground = useSetRecoilState(backgroundState);
  const [recentMusics, setRecentMusics] = useRecoilState(recentMusicsState);

  const getUser = useCallback(
    async (id: string) => {
      if (!userData) {
        setIsLoading(true);
        const result = await fetch(`http://localhost:5000/user/${id}`, {
          credentials: "include",
        }).then((res) => res.json());
        if (result.ok) {
          setUserData(result.user);
          setIsLoading(false);
          setRecentMusics(result.user.recentMusics);
          console.log("get!", id);
        }
      }
    },
    [setRecentMusics, userData] // userData, recentMusics가 변경되면 호출
  );

  useEffect(() => {
    if (userId && !userData && isLoading) {
      getUser(userId); // userData가 없고 로딩 중이 아닐 때만 요청
    }
  }, [userId, userData, isLoading, getUser]); // userId나 userData가 변경될 때만 호출

  useEffect(() => {
    if (user?.userId === userId) {
      setIsMyPage(true); // 내 페이지 여부 확인
    }
  }, [user?.userId, userId]);

  useEffect(() => {
    setBackground(null);
  }, [setBackground]);

  const logOut = async () => {
    const result = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include", // 쿠키를 서버에 포함시킴
    }).then((res) => res.json());
    console.log(result);
    if (result.ok) {
      setUser({ userId: "", loading: false });
      setIsMyPage(false);
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
            {userData && (
              <>
                <InfoName>{userData.username}</InfoName>
                <InfoContent>팔로워 수: 20</InfoContent>
              </>
            )}
          </InfoText>
        </InfoProfile>
        {!isLoading && !user.loading && (
          <InfoButtons>
            {isMyPage ? (
              <>
                <FollowButton>수정</FollowButton>
                <FollowButton onClick={logOut}>로그아웃</FollowButton>
              </>
            ) : (
              <FollowButton>팔로우</FollowButton>
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
