import styled from "styled-components";
import { createPortal } from "react-dom";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentModal = styled.div`
  width: 50%;
  height: 50%;
  background-color: red;
`;

interface ICreatePlaylistModal {
  closeModal: () => void;
}

const CreatePlaylistModal = ({ closeModal }: ICreatePlaylistModal) => {
  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <ContentModal
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <div>
          <div>
            <button onClick={closeModal}>X</button>
          </div>
          <div>
            <span>1234</span>
          </div>
        </div>
      </ContentModal>
    </ModalOverlay>,
    document.body
  );
};

export default CreatePlaylistModal;
