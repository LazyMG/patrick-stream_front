import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../app/entities/user/atom";
import { currentUserPlaylistState } from "../../app/playlist/atom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  /* background-color: darkviolet; */

  overflow: hidden; /* PlaylistView 영역을 넘지 않도록 설정 */

  /* margin-bottom: 80px;  // Playbar 올라왔을 때 */
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
  min-height: 50%; // max-height로 변경
  box-sizing: border-box;

  /* background-color: darkcyan; */

  overflow-y: auto; // scroll에서 auto로 변경
`;

const ListItem = styled.div`
  width: 100%;
  min-height: 50px; // height에서 min-height로 변경
  flex-shrink: 0; // 추가: 아이템의 크기 유지

  border-radius: 15px;

  color: #dddddd;

  cursor: pointer;

  &:hover {
    background-color: #424242;
  }

  background-color: yellowgreen;
`;

interface APIUserPlaylist {
  id: string;
  title: string;
  duration: number;
  introduction: string;
  followersCount: number;
}

const PlayListContainer = () => {
  const user = useRecoilValue(userState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserPlaylist, setCurrentUserPlaylist] = useRecoilState(
    currentUserPlaylistState
  );
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    if (user.userId !== "") {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const getCurrentUserPlaylist = useCallback(async () => {
    const result = await fetch(
      `http://localhost:5000/user/${user.userId}/allPlaylists`
    ).then((res) => res.json());
    console.log(result);
    if (result.ok) {
      console.log(result);
      setCurrentUserPlaylist(result.playlists as APIUserPlaylist[]);
      setIsLoading(false);
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
      <Wrapper>
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
          {/* {Array.from({ length: 50 }).map((_, idx) => (
            <ListItem key={idx} />
          ))} */}
          {!isLoading &&
            currentUserPlaylist.map((item) => <ListItem key={item.id} />)}
        </PlaylistView>
      </Wrapper>
    </>
  );
};

export default PlayListContainer;
