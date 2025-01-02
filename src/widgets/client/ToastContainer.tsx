import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { playlistMusicsState } from "../../app/entities/playlist/atom";
import { useDeletePlaylistMusic } from "../../shared/hooks/useDeletePlaylistMusic";

const Wrapper = styled.div<{ $isPlayerOn: boolean }>`
  position: fixed;
  left: 0;
  bottom: ${(props) => (props.$isPlayerOn ? `85px` : "5px")};
  display: block;
  transition: display 10s ease-in-out;

  width: 100vw;
  z-index: 10;
`;

const Toast = styled.div`
  justify-self: center;
  width: 20%;
  height: 70px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* background-color: #212121; */
  background-color: red;
`;

// display && action

const ToastContainer = ({ isPlayerOn }: { isPlayerOn: boolean }) => {
  const playlistMusics = useRecoilValue(playlistMusicsState);
  const deletePlaylistMusic = useDeletePlaylistMusic();

  const onClickHandler = () => {
    deletePlaylistMusic();
  };

  return (
    <Wrapper $isPlayerOn={isPlayerOn}>
      <Toast>{`${
        playlistMusics?.states.filter((state) => state).length
      }곡을 삭제하시겠습니까?`}</Toast>
      <button onClick={onClickHandler}>클릭</button>
    </Wrapper>
  );
};

export default ToastContainer;
