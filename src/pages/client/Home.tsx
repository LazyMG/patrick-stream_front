import styled from "styled-components";
import FlexList from "../../widgets/client/FlexList";
import GridList from "../../widgets/client/GridList";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundState } from "../../app/entities/global/atom";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIMusic } from "../../shared/models/music";
import { userState } from "../../app/entities/user/atom";
import { APIUser } from "../../shared/models/user";
import { recentMusicsState } from "../../app/entities/music/atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

// const ContentGenre = styled.div`
//   width: 100%;
//   display: flex;
//   gap: 15px;
// `;

// const GenreItem = styled.div`
//   width: 120px;
//   display: flex;
//   justify-content: center;
//   padding: 10px 0;

//   border-radius: 15px;

//   cursor: pointer;
//   background-color: green;
// `;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Home = () => {
  const setBackground = useSetRecoilState(backgroundState);
  const navigate = useNavigate();
  const [musicsData, setMusicsData] = useState<APIMusic[] | null>(null);
  const [isMusicLoading, setIsMusicLoading] = useState(true);
  const user = useRecoilValue(userState);
  const [recentMusics, setRecentMusics] = useRecoilState(recentMusicsState);
  const [userData, setUserData] = useState<APIUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const getUserProfile = useCallback(
    async (id: string) => {
      const result = await fetch(
        `http://localhost:5000/user/${id}`
      ).then((res) => res.json());

      if (result.ok) {
        console.log("로그인한 사용자의 정보", result.user);
        setUserData(result.user);
        setRecentMusics(result.user.recentMusics);
        setIsUserLoading(false);
      }
    },
    [setRecentMusics]
  );

  const getMusics = async () => {
    const result = await fetch(
      `http://localhost:5000/music/recently-updated`
    ).then((res) => res.json());
    if (result.ok) {
      setMusicsData(result.musics);
      setIsMusicLoading(false);
    }
  };

  useEffect(() => {
    if (user.userId !== "") {
      getUserProfile(user.userId);
    }
    getMusics();
  }, [user.userId, getUserProfile]);

  useEffect(() => {
    setBackground(null);
  }, [setBackground]);

  const gotoProfile = () => {
    navigate("/users/675d0657eea62acd6ff079cd");
  };

  return (
    <Wrapper>
      {/* <ContentGenre>
        {Array.from({ length: 5 }).map((_, idx) => (
          <GenreItem key={idx}>장르1</GenreItem>
        ))}
      </ContentGenre> */}
      <ContentContainer>
        {!isMusicLoading && musicsData && userData && (
          <FlexList
            listFlag="music"
            list={musicsData}
            onClick={gotoProfile}
            isCustom={true}
            title={"다시 듣기"}
            icon={
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
            }
            info={userData.username}
          />
        )}
        {recentMusics && recentMusics.length !== 0 && (
          <FlexList
            list={recentMusics}
            listFlag="music"
            isCustom={false}
            title="최근 들은 음악"
          />
        )}
        {!isMusicLoading && musicsData && <GridList list={musicsData} />}
      </ContentContainer>
    </Wrapper>
  );
};

export default Home;
