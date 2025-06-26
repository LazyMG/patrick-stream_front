import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { isPlayerOnState } from "../../app/entities/player/atom";
import Toast from "../../shared/ui/Toast";

const slideUp = keyframes<{ $isPlayerOn: boolean }>`
  0% {
    bottom: -100px;
    opacity: 0;
  }
  100% {
    bottom: ${(props) => (props.$isPlayerOn ? `100px` : "20px")};
    opacity: 1;
  }
`;

const Wrapper = styled.div<{ $isPlayerOn: boolean }>`
  position: fixed;
  left: 0;
  bottom: ${(props) => (props.$isPlayerOn ? `100px` : "20px")};
  display: flex;
  justify-content: center;

  animation: ${slideUp} 0.5s ease-out forwards;

  width: 100vw;
  z-index: 99;
`;

const ToastContainer = ({
  id,
  closeToast,
  onClickHandler,
  text,
}: {
  id?: string;
  closeToast: () => void;
  onClickHandler?: (id: string) => void;
  text: string;
}) => {
  const isPlayerOn = useRecoilValue(isPlayerOnState);

  return (
    <Wrapper $isPlayerOn={isPlayerOn}>
      <Toast
        text={text}
        clickHandler={
          onClickHandler ? () => onClickHandler(id ? id : "") : undefined
        }
        closeToast={closeToast}
      />
    </Wrapper>
  );
};

export default ToastContainer;
