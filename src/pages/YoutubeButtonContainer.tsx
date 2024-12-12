import { useSetRecoilState } from "recoil";
import { ytPlayerState } from "../app/entities/player/atom";

interface IYoutubeButtonContainer {
  setYtId: (ytid: string) => void;
  player: YT.Player | null;
}

const YoutubeButtonContainer = ({
  player,
  setYtId,
}: IYoutubeButtonContainer) => {
  const setytPlayer = useSetRecoilState(ytPlayerState);

  const handlePlay1 = () => {
    setYtId("UGEUGJPk7jg");
    if (player) {
      player.playVideo(); // 버튼 클릭 시 재생
    }
  };

  const handlePlay2 = () => {
    setYtId("x2WuuytIXes");
    if (player) {
      player.playVideo(); // 버튼 클릭 시 재생
    }
  };

  const handlePause = () => {
    if (player) {
      player.pauseVideo();
      setytPlayer(2);
    }
  };
  return (
    <div>
      <button onClick={handlePlay1}>영상1 재생</button>
      <button onClick={handlePlay2}>영상2 재생</button>
      <button onClick={handlePause}>일시정지</button>
    </div>
  );
};

export default YoutubeButtonContainer;
