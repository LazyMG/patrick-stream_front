import styled from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import RowList from "../../widgets/client/RowList";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { APIPlaylist } from "../../shared/models/playlist";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";
import { backgroundState } from "../../app/entities/global/atom";
import { playlistState } from "../../app/entities/music/atom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";

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
  gap: 15px;

  /* background-color: green; */
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

const InfoTitle = styled.span`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
`;

const InfoContent = styled.p`
  font-size: 14px;
  color: #777777;

  a {
    color: #777777;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoDescription = styled.p`
  max-width: 80%; /* 부모 요소의 최대 너비를 따르도록 설정 */
  word-break: break-word; /* 긴 단어가 있을 때 강제로 줄바꿈 */
  overflow-wrap: break-word; /* 컨테이너를 벗어나지 않도록 줄바꿈 */
  white-space: normal; /* 기본 줄바꿈 규칙을 따르도록 설정 */
  overflow: hidden; /* 넘치는 내용은 숨김 */
`;

const InfoButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PlaylistPlayButton = styled.button`
  border: none;
  background: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f5a3a5;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    width: 20px;
  }
`;

const FollowButton = styled(DefaultButton)<{ $follow: boolean }>`
  color: ${(props) => (props.$follow ? "#fff" : "#000")};
  background-color: ${(props) => (props.$follow ? "#000" : "#fff")};

  font-size: 16px;

  padding: 5px 30px;

  border: 1px solid #fff;

  transition: transform 0.1s ease-in-out, color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Playlist = () => {
  const { playlistId } = useParams();
  const { state } = useLocation();
  const [playlistData, setPlaylistData] = useState<APIPlaylist | null>(null);
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [isMine, setIsMine] = useState(false);

  const [follow, setFollow] = useState(false);
  const [followers, setFollowers] = useState<number | null>(null);

  const currentFollowers = playlistData?.followers?.length ?? 0;

  const loginUserData = useRecoilValue(loginUserDataState);
  const currentUserPlaylist = useRecoilValue(currentUserPlaylistState);

  const setBackground = useSetRecoilState(backgroundState);

  const setMusicPlaylist = useSetRecoilState(playlistState);
  const playMusic = usePlayMusic();

  useEffect(() => {
    setFollowers((prev) =>
      prev === currentFollowers ? prev : currentFollowers
    );
  }, [currentFollowers]);

  useEffect(() => {
    if (loginUserData) {
      const isFollow = loginUserData.followings?.followingPlaylists.some(
        (playlist) => playlist === playlistId
      );
      setFollow(!!isFollow);
    }
  }, [loginUserData, playlistId]);

  const getPlaylistData = useCallback(async (id: string) => {
    const result = await fetch(
      `http://localhost:5000/playlist/${id}`
    ).then((res) => res.json());
    if (result.ok) {
      setPlaylistData(result.playlist as APIPlaylist);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setBackground(null);

    if (user.userId !== "" && currentUserPlaylist && playlistId) {
      const thisPlaylist = currentUserPlaylist.find(
        (item) => item._id === playlistId
      );
      if (thisPlaylist) {
        setIsMine(true);
        setPlaylistData(thisPlaylist);
        setIsLoading(false);
        return;
      }
    }
    if (playlistId) getPlaylistData(playlistId);
  }, [
    currentUserPlaylist,
    getPlaylistData,
    playlistId,
    user.userId,
    setBackground,
  ]);

  const displayContent = state || playlistData;

  const followPlaylist = async () => {
    if (!playlistId || isMine || user.userId === "" || follow === null) return;

    const addList = !follow;

    setFollow(addList);
    setFollowers((prev) => {
      if (prev === null) return prev;
      return addList ? prev + 1 : Math.max(prev - 1, 0);
    });

    await fetch(`http://localhost:5000/playlist/${playlistId}/followers`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activeUserId: user.userId,
        addList,
      }),
    });
  };

  const playPlaylistMusics = () => {
    if (!playlistData?.musics) return;
    setMusicPlaylist(playlistData.musics);
    playMusic(playlistData.musics[0]);
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
              <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
            </svg>
          </InfoIcon>
          <InfoText>
            {isLoading && !state ? (
              // state가 없고 playlistData가 로딩 중일 때 전체 로딩 UI
              <>
                <div>Loading</div>
              </>
            ) : (
              <>
                <InfoTitle>{displayContent?.title || "제목"}</InfoTitle>
                <InfoDescription>
                  {displayContent?.info || "정보"}
                </InfoDescription>
                <InfoContent>
                  생성자:{" "}
                  <Link
                    to={`/users/${displayContent?.user._id}`}
                    state={displayContent.user}
                  >
                    {displayContent?.user.username || "알 수 없음"}
                  </Link>
                </InfoContent>
                <InfoContent>팔로워 수: {followers}명</InfoContent>
              </>
            )}
          </InfoText>
        </InfoProfile>
        {!isLoading && (
          <InfoButtons>
            <PlaylistPlayButton onClick={playPlaylistMusics}>
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                />
              </svg>
            </PlaylistPlayButton>
            {isMine ? (
              <>
                <FollowButton $follow={false}>수정하기</FollowButton>
                <FollowButton $follow={true}>삭제하기</FollowButton>
              </>
            ) : (
              <FollowButton $follow={follow} onClick={followPlaylist}>
                {follow ? "언팔로우" : "팔로우"}
              </FollowButton>
            )}
          </InfoButtons>
        )}
      </InfoContainer>
      {playlistData?.musics && playlistData?.musics.length !== 0 && (
        <RowList
          title="재생목록 음악"
          subTitle="공개"
          list={playlistData?.musics}
        />
      )}
    </Wrapper>
  );
};

export default Playlist;
