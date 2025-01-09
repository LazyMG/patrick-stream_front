import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../app/entities/user/atom";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";
import PlaylistItem from "../../shared/ui/PlaylistItem";
import { APIPlaylist } from "../../shared/models/playlist";
import { isPlayerOnState } from "../../app/entities/player/atom";

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

const PlaylistError = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: red;
`;

interface IError {
  state: boolean;
  text: string;
}

const PlayListContainer = () => {
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserPlaylist, setCurrentUserPlaylist] = useRecoilState(
    currentUserPlaylistState
  );
  const [isLoading, setIsLoading] = useState(true);
  const isPlayerOn = useRecoilValue(isPlayerOnState);
  const [isError, setIsError] = useState<IError>({
    state: false,
    text: "",
  });

  const openModal = () => {
    if (user.userId !== "") {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const getCurrentUserPlaylist = useCallback(async () => {
    const result = await fetch(
      `http://localhost:5000/user/${user.userId}/allPlaylists`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
    if (result.ok) {
      // console.log("Container!");
      setCurrentUserPlaylist(result.playlists as APIPlaylist[]);
      setIsLoading(false);
    } else {
      console.log("error!");
      setIsError({ state: true, text: "오류가 발생했습니다." });
    }
  }, [user.userId, setCurrentUserPlaylist]);

  useEffect(() => {
    if (user.userId !== "") {
      getCurrentUserPlaylist();
    }
  }, [getCurrentUserPlaylist, user.userId]);

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
        {!isError.state ? (
          <PlaylistView>
            {!isLoading &&
              currentUserPlaylist.map((item) => (
                <PlaylistItem playlist={item} key={item._id} />
              ))}
          </PlaylistView>
        ) : (
          <PlaylistError>{isError.text}</PlaylistError>
        )}
      </Wrapper>
    </>
  );
};

export default PlayListContainer;
