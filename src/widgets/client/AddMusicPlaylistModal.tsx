import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";
import AddMusicPlaylistItem from "./AddMusicPlaylistItem";
import { useEffect } from "react";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentModal = styled.div`
  width: 20%;
  min-width: 300px;
  height: 60%;
  background-color: #212121;
  border: 0.1px solid #414141;
  border-radius: 10px;
  padding: 27px 0;

  @media (max-width: 940px) {
    font-size: 12px;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  padding-bottom: 10px;

  background-color: #212121;
`;

const CloseButton = styled.div`
  svg {
    width: 30px;
    color: white;
    cursor: pointer;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListTitle = styled.span`
  padding-left: 25px;
  color: #fff;
  font-weight: 500;

  margin-bottom: 10px;
`;

interface IAddMusicPlaylistModal {
  closeModal: () => void;
}

const AddMusicPlaylistModal = ({ closeModal }: IAddMusicPlaylistModal) => {
  const currentUserPlaylist = useRecoilValue(currentUserPlaylistState);

  const handlePopState = () => {
    // 뒤로 가기가 발생하면 모달을 닫음
    closeModal();
  };

  useEffect(() => {
    // 모달이 열릴 때 현재 상태를 push
    window.history.pushState({ modalOpen: true }, "");

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    };
  }, []);

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ContentModal
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <Content>
          <Header>
            <Title>재생목록에 저장</Title>
            <CloseButton onClick={closeModal}>
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                />
              </svg>
            </CloseButton>
          </Header>

          <ListContainer>
            <ListTitle>모든 재생 목록</ListTitle>
            {currentUserPlaylist?.map((item) => (
              <AddMusicPlaylistItem
                key={item.playlist._id}
                currentPlaylist={item.playlist}
                closeModal={closeModal}
              />
            ))}
          </ListContainer>
        </Content>
      </ContentModal>
    </ModalOverlay>,
    document.body
  );
};

export default AddMusicPlaylistModal;
