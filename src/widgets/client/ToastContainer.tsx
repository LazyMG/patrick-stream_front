import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { playlistMusicsState } from "../../app/entities/playlist/atom";
import { useDeletePlaylistMusic } from "../../shared/hooks/useDeletePlaylistMusic";
import { isPlayerOnState } from "../../app/entities/player/atom";
import Toast from "../../shared/ui/Toast";

const Wrapper = styled.div<{ $isPlayerOn: boolean }>`
  position: fixed;
  left: 0;
  bottom: ${(props) => (props.$isPlayerOn ? `100px` : "20px")};
  display: block;
  transition: display 10s ease-in-out;

  width: 100vw;
  z-index: 10;
`;

const ToastContainer = ({
  id,
  closeToast,
}: {
  id: string;
  closeToast: () => void;
}) => {
  const playlistMusics = useRecoilValue(playlistMusicsState);
  const deletePlaylistMusic = useDeletePlaylistMusic();
  const isPlayerOn = useRecoilValue(isPlayerOnState);

  const onClickHandler = () => {
    deletePlaylistMusic(id);
  };

  return (
    <Wrapper $isPlayerOn={isPlayerOn}>
      <Toast
        text={`${
          playlistMusics?.filter((item) => item.state).length
        }곡을 삭제하시겠습니까?`}
        clickHandler={onClickHandler}
        closeToast={closeToast}
      />
    </Wrapper>
  );
};

export default ToastContainer;
