import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  playingPlaylistState,
  selectedMusicState,
} from "../../app/entities/music/atom";
import CurrentPlaylistItem from "./CurrentPlaylistItem";

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
  width: 35%;
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

interface ICurrentPlaylistModal {
  closeModal: () => void;
}

const CurrentPlaylistModal = ({ closeModal }: ICurrentPlaylistModal) => {
  const playingPlaylist = useRecoilValue(playingPlaylistState);
  const selectedMusic = useRecoilValue(selectedMusicState);

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ContentModal
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <Content>
          <Title>다음 트랙</Title>
          <ListContainer>
            {playingPlaylist?.map((music) => (
              <CurrentPlaylistItem
                key={music._id}
                music={music}
                isSelectedMusic={
                  selectedMusic ? selectedMusic._id === music._id : false
                }
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

export default CurrentPlaylistModal;
