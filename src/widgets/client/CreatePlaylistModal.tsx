import styled from "styled-components";
import { createPortal } from "react-dom";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentModal = styled.div`
  width: 34%;
  height: 38%;
  background-color: #212121;
  border: 0.1px solid #414141;
  border-radius: 10px;
  padding: 27px 25px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 70px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
`;

const ModalForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 45px;

  input {
    background: none;
    border: none;
    outline: none;

    font-size: 18px;
    border-bottom: 0.1px solid #414141;
    padding-bottom: 4px;

    color: #fff;
    font-weight: bold;

    &::placeholder {
      color: #414141;
      font-weight: normal;
    }

    &:focus {
      outline: none;
      color: #fff;
      border-bottom: 0.1px solid #fff;
    }
  }
`;

const ButtonRow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 20px;

  button {
    background: none;
    border: none;

    color: #fff;
    font-size: 16px;

    cursor: pointer;
  }
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
        <Content>
          <Title>새 재생목록</Title>
          <ModalForm>
            <input placeholder="제목" />
            <input placeholder="설명" />
            <ButtonRow>
              <button onClick={closeModal}>취소</button>
              <button>만들기</button>
            </ButtonRow>
          </ModalForm>
        </Content>
      </ContentModal>
    </ModalOverlay>,
    document.body
  );
};

export default CreatePlaylistModal;
