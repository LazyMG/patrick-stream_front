import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentUserPlaylistState } from "../../app/entities/playlist/atom";
import AddMusicPlaylistItem from "./AddMusicPlaylistItem";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentModal = styled.div`
  width: 20%;
  height: 60%;
  background-color: #212121;
  border: 0.1px solid #414141;
  border-radius: 10px;
  padding: 27px 0;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  width: 100%;
  padding-bottom: 10px;
  padding-left: 25px;

  background-color: #212121;
`;

const ListContainer = styled.div`
  width: 100%;
  max-height: 100%;

  display: flex;
  flex-direction: column;
  /* gap: 5px; */

  overflow-y: scroll;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨김 */
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

  console.log(currentUserPlaylist);
  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ContentModal
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <Content>
          <Title>재생목록에 저장</Title>
          <ListContainer>
            <ListTitle>모든 재생 목록</ListTitle>
            {currentUserPlaylist.map((playlist) => (
              <AddMusicPlaylistItem
                key={playlist._id}
                playlist={playlist}
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