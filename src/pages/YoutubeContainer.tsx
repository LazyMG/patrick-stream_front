import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import YoutubeButtonContainer from "./YoutubeButtonContainer";
import YoutubeController from "./YoutubeController";
import { ytIdState } from "../app/entities/music/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentPlayerState, ytPlayerState } from "../app/entities/player/atom";

interface IYoutubeContainer {
  setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
  player: YT.Player | null;
}

function YoutubeContainer({ player, setPlayer }: IYoutubeContainer) {
  const [ytId, setYtId] = useRecoilState(ytIdState);
  const setytPlayer = useSetRecoilState(ytPlayerState);
  const currentPlayer = useRecoilValue(currentPlayerState);

  const [isMute, setIsMute] = useState<boolean>(false);

  // 전체 플레이어 관리
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    // console.dir(event.target);
    // console.log("play!", player?.getPlayerState());

    if (player) {
      event.target.setVolume(currentPlayer.volume);
    }
    console.log("volume", event.target.getVolume());

    if (player && currentPlayer.isMuted) {
      event.target.mute();
    }
  };

  const onPlayerPlay: YouTubeProps["onPlay"] = () => {
    // if (player && isMute) {
    //   console.log("isMute", isMute);
    //   player.mute();
    // }
    // if (player) {
    //   console.log("ytplayer i'm ready!");
    // }
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    // console.log("change!", event.target);
    console.log("player's state", event.target.getPlayerState());

    setytPlayer(event.target.getPlayerState());
  };

  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    // height: "390",
    // width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <>
      {/* <YoutubeButtonContainer player={player} setYtId={setYtId} /> */}
      <YouTube
        videoId={ytId}
        opts={opts}
        onReady={onPlayerReady}
        onPlay={onPlayerPlay}
        onStateChange={onStateChange}
      />
      {/* <YoutubeController player={player} setIsMute={setIsMute} /> */}
    </>
  );
}

export default YoutubeContainer;
