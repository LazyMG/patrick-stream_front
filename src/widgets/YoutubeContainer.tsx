import YouTube, { YouTubeProps } from "react-youtube";
import { ytIdState } from "../app/entities/music/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPlayerState, ytPlayerState } from "../app/entities/player/atom";

interface IYoutubeContainer {
  setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
  player: YT.Player | null;
}

function YoutubeContainer({ player, setPlayer }: IYoutubeContainer) {
  const ytId = useRecoilValue(ytIdState);
  const setytPlayer = useSetRecoilState(ytPlayerState);
  const currentPlayer = useRecoilValue(currentPlayerState);

  // 전체 플레이어 관리
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    // console.dir(event.target);
    // console.log("play!", player?.getPlayerState());
    // console.log("ready");
    // console.log("currentPlayer", currentPlayer.isPaused);

    if (currentPlayer.isRedirectPaused) {
      // console.log("true");
      event.target.pauseVideo();
    }

    if (player) {
      event.target.setVolume(currentPlayer.volume);
    }

    if (player && currentPlayer.isMuted) {
      event.target.mute();
    }
  };

  const onPlayerPlay: YouTubeProps["onPlay"] = () => {};

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    setytPlayer(event.target.getPlayerState());

    if (currentPlayer.isRedirectPaused) {
      setytPlayer(2);
    }
  };

  const opts: YouTubeProps["opts"] = {
    // height: "0",
    // width: "0",
    height: "390",
    width: "320",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <>
      <YouTube
        videoId={ytId.ytId}
        opts={opts}
        onReady={onPlayerReady}
        onPlay={onPlayerPlay}
        onStateChange={onStateChange}
      />
    </>
  );
}

export default YoutubeContainer;
