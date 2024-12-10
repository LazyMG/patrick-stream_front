import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import YoutubeButtonContainer from "./YoutubeButtonContainer";
import YoutubeController from "./YoutubeController";
import { playingState, ytIdState } from "../app/entities/music/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

interface IYoutubeContainer {
  setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
  player: YT.Player | null;
}

function YoutubeContainer({ player, setPlayer }: IYoutubeContainer) {
  const [ytId, setYtId] = useRecoilState(ytIdState);
  const setPlayingState = useSetRecoilState(playingState);

  const [isMute, setIsMute] = useState<boolean>(false);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target);
    // console.dir(event.target);

    // console.log("play!", player?.getPlayerState());

    if (player && isMute) {
      console.log("isMute", isMute);
      event.target.mute();
    }
  };

  const onPlayerPlay: YouTubeProps["onPlay"] = () => {
    // if (player && isMute) {
    //   console.log("isMute", isMute);
    //   player.mute();
    // }
    if (player) {
      console.log("onPlayerPlay", player.getPlayerState());
    }
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    console.log("change!", event.target);
    setPlayingState(event.target.getPlayerState());
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <>
      <YoutubeButtonContainer player={player} setYtId={setYtId} />
      <YouTube
        videoId={ytId}
        opts={opts}
        onReady={onPlayerReady}
        onPlay={onPlayerPlay}
        onStateChange={onStateChange}
      />
      <YoutubeController player={player} setIsMute={setIsMute} />
    </>
  );
}

export default YoutubeContainer;
