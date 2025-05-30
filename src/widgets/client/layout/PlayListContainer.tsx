import { useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import CreatePlaylistModal from "./../CreatePlaylistModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../app/entities/user/atom";
import { currentUserPlaylistState } from "../../../app/entities/playlist/atom";
import PlaylistItem from "../../../shared/ui/PlaylistItem";
import { APIPlaylist } from "../../../shared/models/playlist";
import { isPlayerOnState } from "../../../app/entities/player/atom";
import { useToast } from "../../../shared/hooks/useToast";
import PlaylistErrorItem from "../../../shared/ui/PlaylistErrorItem";

const Wrapper = styled.div<{ $isPlayerOn: boolean; $isSideBarChange: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  overflow: hidden;

  ${(props) => (props.$isPlayerOn ? `margin-bottom: 80px;` : "")}

  ${(props) =>
    props.$isSideBarChange &&
    css`
      display: none;
    `}

  @media (max-width: 940px) {
    display: none;
  }
`;

const CreateButton = styled.div`
  width: 90%;
  padding: 23px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  max-height: 40px;
  box-sizing: border-box;
  border-radius: 20px;
  color: #dddddd;

  cursor: pointer;

  background-color: #2e2e2e;

  svg {
    width: 20px;
  }

  &:hover {
    background-color: #424242;
  }
`;

const PlaylistView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-height: 50%;
  box-sizing: border-box;

  overflow-y: auto;
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

const PlaylistSkeleton = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 15px;
  background-color: #424242;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;
`;

const PlayListContainer = ({
  isSideBarChange,
}: {
  isSideBarChange: boolean;
}) => {
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserPlaylist, setCurrentUserPlaylist] = useRecoilState(
    currentUserPlaylistState
  );
  const [isLoading, setIsLoading] = useState(true);
  const isPlayerOn = useRecoilValue(isPlayerOnState);
  const { setGlobalToast } = useToast();
  const [isError, setIsError] = useState(false);

  const openModal = () => {
    if (user.userId !== "") {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const getCurrentUserPlaylist = useCallback(async () => {
    if (isError) return;

    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/user/${user.userId}/allPlaylists`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
    if (result.ok) {
      const playlists = result.playlists as APIPlaylist[];
      setCurrentUserPlaylist(
        playlists.map((playlist) => {
          return {
            playlist,
            isError: false,
            isLoading: false,
          };
        })
      );
      // setCurrentUserPlaylist(result.playlists as APIPlaylist[]);
    } else {
      if (!result.error) {
        if (result.type === "ERROR_ID") {
          setGlobalToast(
            "잘못된 데이터입니다.",
            "USER_PLAYLIST_ERROR_ID_ERROR"
          );
        } else if (result.type === "NO_DATA") {
          setGlobalToast(
            "존재하지 않는 데이터입니다.",
            "USER_PLAYLIST_NO_DATA_ERROR"
          );
        }
      } else {
        setGlobalToast("일시적인 오류입니다.", "USER_PLAYLIST_DB_ERROR");
      }
      setCurrentUserPlaylist([]);
      setIsError(true);
    }
    setIsLoading(false);
  }, [user.userId, setCurrentUserPlaylist, isError]);

  useEffect(() => {
    if (user.userId !== "") {
      getCurrentUserPlaylist();
    }
    if (!user.loading && user.userId === "") {
      setCurrentUserPlaylist([]);
      setIsLoading(false);
    }
  }, [user.userId, user.loading]);

  return (
    <>
      {isModalOpen && <CreatePlaylistModal closeModal={closeModal} />}
      <Wrapper $isPlayerOn={isPlayerOn} $isSideBarChange={isSideBarChange}>
        <CreateButton onClick={openModal}>
          <svg
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>새 재생목록 추가</span>
        </CreateButton>
        <PlaylistView>
          {!isLoading ? (
            currentUserPlaylist ? (
              currentUserPlaylist.map((item) => {
                if (item.isLoading) {
                  return <PlaylistSkeleton key={item.playlist._id} />;
                } else if (item.isError) {
                  return (
                    <PlaylistErrorItem
                      playlist={item.playlist}
                      key={item.playlist._id}
                    />
                  );
                } else {
                  return (
                    <PlaylistItem
                      playlist={item.playlist}
                      key={item.playlist._id}
                    />
                  );
                }
              })
            ) : (
              <>
                <PlaylistSkeleton />
                <PlaylistSkeleton />
                <PlaylistSkeleton />
              </>
            )
          ) : (
            <>
              <PlaylistSkeleton />
              <PlaylistSkeleton />
              <PlaylistSkeleton />
            </>
          )}
        </PlaylistView>
      </Wrapper>
    </>
  );
};

export default PlayListContainer;
