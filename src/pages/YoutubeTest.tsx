import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import YoutubeButtonContainer from "./YoutubeButtonContainer";

function YoutubeTest() {
  const [player, setPlayer] = useState<YT.Player | null>(null);
  const [ytId, setYtId] = useState<string>("");

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    setPlayer(event.target);
    console.dir(event.target);
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
      <YouTube videoId={ytId} opts={opts} onReady={onPlayerReady} />
    </>
  );
}

export default YoutubeTest;
