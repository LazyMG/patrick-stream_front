interface IYoutubeController {
  player: YT.Player | null;
  setIsMute: React.Dispatch<React.SetStateAction<boolean>>;
}

const YoutubeController = ({ player, setIsMute }: IYoutubeController) => {
  const muteMusic = () => {
    if (player) {
      setIsMute(true);
      player.mute();
    }
  };
  return (
    <div>
      <button onClick={muteMusic}>음소거</button>
    </div>
  );
};

export default YoutubeController;
