import { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../app/entities/user/atom";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";
import PlaylistItem from "../../shared/ui/PlaylistItem";
import { APIPlaylist } from "../../shared/models/playlist";
import { isPlayerOnState } from "../../app/entities/player/atom";
import { useToast } from "../../shared/hooks/useToast";

const Wrapper = styled.div<{ $isPlayerOn: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  overflow: hidden;

  ${(props) => (props.$isPlayerOn ? `margin-bottom: 80px;` : "")}
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

const PlayListContainer = () => {
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
    console.log("fetch");
    const result = await fetch(
      `http://localhost:5000/user/${user.userId}/allPlaylists`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
    if (result.ok) {
      setCurrentUserPlaylist(result.playlists as APIPlaylist[]);
      setIsLoading(false);
    } else {
      setIsError(true);
      setGlobalToast("Playlist Error");
    }
  }, [user.userId, setCurrentUserPlaylist, setGlobalToast, isError]);

  useEffect(() => {
    if (user.userId !== "" && !isError) {
      getCurrentUserPlaylist();
    } else {
      setIsLoading(false);
    }
  }, [getCurrentUserPlaylist, user.userId, isError]);

  return (
    <>
      {isModalOpen && <CreatePlaylistModal closeModal={closeModal} />}
      <Wrapper $isPlayerOn={isPlayerOn}>
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
            currentUserPlaylist.map((item) => (
              <PlaylistItem playlist={item} key={item._id} />
            ))
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
