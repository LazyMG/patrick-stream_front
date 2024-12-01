interface IYoutubeButtonContainer {
  setYtId: (ytid: string) => void;
  player: YT.Player | null;
}

const YoutubeButtonContainer = ({
  player,
  setYtId,
}: IYoutubeButtonContainer) => {
  const handlePlay1 = () => {
    setYtId("JZ_HcuJJpZ4");
    if (player) {
      player.playVideo(); // 버튼 클릭 시 재생
    }
  };

  const handlePlay2 = () => {
    setYtId("xZbjgsE-Vlo");
    if (player) {
      player.playVideo(); // 버튼 클릭 시 재생
    }
  };

  const handlePause = () => {
    if (player) {
      player.pauseVideo();
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
