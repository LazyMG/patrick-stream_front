import styled, { keyframes } from "styled-components";
import { DefaultButton } from "../../shared/ui/DefaultButton";
import RowList from "../../widgets/client/RowList/RowList";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { APIPlaylist } from "../../shared/models/playlist";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../../app/entities/user/atom";
import {
  currentUserPlaylistState,
  followingPlaylistsState,
  playlistMusicsState,
} from "../../app/entities/playlist/atom";
import {
  backgroundState,
  isPlaylistToastOpenState,
} from "../../app/entities/global/atom";
import { playingPlaylistState } from "../../app/entities/music/atom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";
import ToastContainer from "../../widgets/client/ToastContainer";
import NotFoundComponent from "../../widgets/NotFoundComponent";
import { useDeletePlaylistMusic } from "../../shared/hooks/useDeletePlaylistMusic";
import RowListSkeleton from "../../widgets/client/RowList/RowListSkeleton";
import { debounce } from "lodash";
import { useToast } from "../../shared/hooks/useToast";

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
  max-width: 950px;
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
  background-color: ${(props) => props.theme.color.pink};
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: transform 0.1s ease-in;

  svg {
    width: 20px;
    transition: transform 0.1s ease-in;
  }

  &:hover {
    transform: scale(1.1);
    svg {
      transform: scale(1.1);
    }
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

const InfoTitleSkeleton = styled.span`
  height: 40px;
  background-color: #2e2e2e;
  border-radius: 10px;

  width: 40%;
`;

const InfoDescriptionSkeleton = styled.p`
  width: 950px;
  height: 20px;

  background-color: #2e2e2e;
  border-radius: 10px;
`;

const InfoContentSkeleton = styled.p`
  height: 20px;
  background-color: #2e2e2e;
  border-radius: 10px;

  width: 20%;
`;

const InfoButtonsSkeleton = styled.div`
  height: 48px;
  width: 30%;
  min-width: 180px;
  border-radius: 10px;

  background-color: #2e2e2e;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const Playlist = () => {
  const { playlistId } = useParams();
  const [playlistData, setPlaylistData] = useState<APIPlaylist | null>(null);
  const user = useRecoilValue(userState);
  const [isLoading, setIsLoading] = useState(true);
  const [isMine, setIsMine] = useState(false);

  const [follow, setFollow] = useState<boolean | null>(null);
  const [followers, setFollowers] = useState<number | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);

  const currentFollowers = playlistData?.followers?.length ?? 0;

  const [followingPlaylists, setFollowingPlaylists] = useRecoilState(
    followingPlaylistsState
  );
  const [currentUserPlaylist, setCurrentUserPlaylist] = useRecoilState(
    currentUserPlaylistState
  );

  const setBackground = useSetRecoilState(backgroundState);

  const [playlistMusics, setPlaylistMusics] = useRecoilState(
    playlistMusicsState
  );
  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
  const playMusic = usePlayMusic();
  const navigate = useNavigate();

  const [isPlaylistToastOpen, setIsPlaylistToastOpen] = useRecoilState(
    isPlaylistToastOpenState
  );
  const deletePlaylistMusic = useDeletePlaylistMusic();
  const { setGlobalToast } = useToast();

  useEffect(() => {
    setFollowers((prev) =>
      prev === currentFollowers ? prev : currentFollowers
    );
  }, [currentFollowers]);

  useEffect(() => {
    if (followingPlaylists) {
      const isFollow = followingPlaylists.some(
        (playlist) => playlist._id === playlistId
      );
      setFollow(!!isFollow);
    }
  }, [followingPlaylists, playlistId]);

  const getPlaylistData = useCallback(
    async (id: string) => {
      if (isError) return;
      const result = await fetch(
        `http://localhost:5000/playlist/${id}`
      ).then((res) => res.json());
      if (result.ok) {
        setPlaylistData(result.playlist as APIPlaylist);
        setIsLoading(false);
      } else {
        setIsError(true);
        if (!result.error) {
          setIsNotFound(true);
        } else {
          setGlobalToast("Playlist Error", "PLAYLIST_DATA_FETCH_ERROR");
          setIsLoading(false);
        }
      }
    },
    [setGlobalToast, isError]
  );

  useEffect(() => {
    setIsNotFound(false);
  }, [playlistId]);

  useEffect(() => {
    setBackground(null);
    setIsPlaylistToastOpen(false);

    if (user.userId !== "" && currentUserPlaylist && playlistId) {
      const thisPlaylist = currentUserPlaylist.find(
        (item) => item._id === playlistId
      );
      if (thisPlaylist) {
        setIsMine(true);
        setPlaylistData(thisPlaylist);
        if (thisPlaylist.musics)
          setPlaylistMusics((prev) => {
            if (!thisPlaylist.musics) return prev;
            const playlistMusicStatesList = [...thisPlaylist.musics].map(
              (music) => {
                return {
                  music,
                  state: false,
                };
              }
            );
            return playlistMusicStatesList;
          });

        setIsLoading(false);
        return;
      }
    }
    if (playlistId) getPlaylistData(playlistId);
  }, [
    currentUserPlaylist,
    playlistId,
    user.userId,
    setBackground,
    setPlaylistMusics,
    setIsPlaylistToastOpen,
  ]);

  const patchPlaylistFollowers = useCallback(
    async (addList: boolean) => {
      await fetch(`http://localhost:5000/playlist/${playlistId}/followers`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activeUserId: user.userId,
          addList,
        }),
      });
    },
    [playlistId, user.userId]
  );

  const debouncedFollowPlaylist = useMemo(
    () => debounce((addList) => patchPlaylistFollowers(addList), 200),
    [patchPlaylistFollowers]
  );

  const followPlaylist = async () => {
    if (!playlistId || isMine || user.userId === "" || follow === null) return;

    const addList = !follow;

    setFollow(addList);
    setFollowers((prev) => {
      if (prev === null) return prev;
      return addList ? prev + 1 : Math.max(prev - 1, 0);
    });

    if (playlistData) {
      setFollowingPlaylists((prev) => {
        if (!prev) return prev;
        if (addList) {
          return [playlistData, ...prev];
        } else {
          const newList = prev.filter(
            (playlist) => playlist._id !== playlistData._id
          );
          return [...newList];
        }
      });
    }

    debouncedFollowPlaylist(addList);
  };

  const playPlaylistMusics = () => {
    if (!playlistData?.musics) return;
    setPlayingPlaylist(playlistData.musics);
    playMusic(playlistData.musics[0], true);
  };

  const deletePlaylist = async () => {
    if (!playlistId) return;
    // 현재 사용자 플레이리스트에서 삭제
    setCurrentUserPlaylist((prev) => {
      if (!prev) return prev;
      return [...prev].filter((playlist) => playlist._id !== playlistId);
    });

    // DB에서 삭제
    const result = await fetch(`http://localhost:5000/playlist/${playlistId}`, {
      method: "DELETE",
      credentials: "include",
    }).then((res) => res.json());

    if (result.ok) {
      navigate("/");
    }
  };

  const onClickHandler = (id: string) => {
    deletePlaylistMusic(id);
  };

  const closeToast = () => {
    setIsPlaylistToastOpen(false);
  };

  if (isNotFound) {
    return <NotFoundComponent />;
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
              <path d="M5.566 4.657A4.505 4.505 0 0 1 6.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0 0 15.75 3h-7.5a3 3 0 0 0-2.684 1.657ZM2.25 12a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3v-6ZM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 0 1 6.75 6h10.5a3 3 0 0 1 2.683 1.657A4.505 4.505 0 0 0 18.75 7.5H5.25Z" />
            </svg>
          </InfoIcon>
          {!isLoading ? (
            <InfoText>
              <InfoTitle>{playlistData?.title}</InfoTitle>
              <InfoDescription>{playlistData?.introduction}</InfoDescription>
              <InfoContent>
                생성자:{" "}
                <Link to={`/users/${playlistData?.user._id}`}>
                  {playlistData?.user.username}
                </Link>
              </InfoContent>
              <InfoContent>팔로워 수: {followers}명</InfoContent>
            </InfoText>
          ) : (
            <InfoTextSkeleton>
              <InfoTitleSkeleton />
              <InfoDescriptionSkeleton />
              <InfoContentSkeleton />
              <InfoContentSkeleton />
            </InfoTextSkeleton>
          )}
        </InfoProfile>
        {!isLoading && follow !== null ? (
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
                <FollowButton $follow={true} onClick={deletePlaylist}>
                  삭제하기
                </FollowButton>
              </>
            ) : (
              <FollowButton $follow={!!follow} onClick={followPlaylist}>
                {follow ? "언팔로우" : "팔로우"}
              </FollowButton>
            )}
          </InfoButtons>
        ) : (
          <InfoButtonsSkeleton />
        )}
      </InfoContainer>
      {isLoading && <RowListSkeleton />}
      {playlistData?.musics && playlistData?.musics.length !== 0 && (
        <RowList
          title="재생목록 음악"
          subTitle="공개"
          list={
            isMine
              ? playlistMusics?.map((item) => item.music)
              : playlistData?.musics
          }
          isMine={isMine}
          noLimit={true}
        />
      )}
      {isPlaylistToastOpen && playlistId && (
        <ToastContainer
          text={`${
            playlistMusics?.filter((item) => item.state).length
          }곡을 삭제하시겠습니까?`}
          id={playlistId}
          onClickHandler={onClickHandler}
          closeToast={closeToast}
        />
      )}
    </Wrapper>
  );
};

export default Playlist;
