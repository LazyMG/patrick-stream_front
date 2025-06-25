import YouTube, { YouTubeProps } from "react-youtube";
import { ytIdState } from "../app/entities/music/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPlayerState,
  playerInstanceAtom,
  ytPlayerState,
} from "../app/entities/player/atom";

function isMobileByUserAgent() {
  const userAgent = navigator.userAgent; // 구형 브라우저 호환성을 위해 navigator.vendor, window.opera도 고려

  // 모바일 기기를 나타내는 일반적인 키워드 목록
  // 대소문자 구분을 없애기 위해 /i 플래그 사용
  const mobileKeywords = [
    "android",
    "ipad",
    "iphone",
    "ipod",
    "blackberry",
    "blazer",
    "compal",
    "elaine",
    "fennec",
    "hiptop",
    "iemobile",
    "ip(hone|od)",
    "iris",
    "kindle",
    "lge ",
    "maemo",
    "midp",
    "mmp",
    "netfront",
    "opera m(ob|in)i",
    "palm( os)?",
    "phone",
    "p(ixi|rim)",
    "plucker",
    "pocket",
    "psp",
    "series(4|6)0",
    "symbian",
    "treo",
    "up\\.(browser|link)",
    "vodafone",
    "wap",
    "windows ce",
    "xda",
    "xiino",
    "mobi", // 'Mobile' 키워드는 대부분의 모바일 브라우저에 포함됩니다.
  ];

  const regex = new RegExp(mobileKeywords.join("|"), "i");

  return regex.test(userAgent);
}

// interface IYoutubeContainer {
//   setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
//   player: YT.Player | null;
// }

function YoutubeContainer() {
  const ytId = useRecoilValue(ytIdState);
  const [ytPlayer, setytPlayer] = useRecoilState(ytPlayerState);
  const currentPlayer = useRecoilValue(currentPlayerState);
  // const setPlayerInstance = useSetRecoilState(playerInstanceAtom);
  const [player, setPlayer] = useRecoilState(playerInstanceAtom);
  const isMobile = isMobileByUserAgent();
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);

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

  const onPlayerPlay: YouTubeProps["onPlay"] = (event) => {
    // if (isMobile) {
    //   event.target.unMute();
    // }
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (isMobile && ytPlayer === 3 && event.target.getPlayerState() === -1) {
      setytPlayer(2);
      setCurrentPlayer((prev) => {
        return {
          ...prev,
          isPaused: true,
        };
      });
    } else {
      setytPlayer(event.target.getPlayerState());

      if (event.target.getPlayerState() === 1) {
        setCurrentPlayer((prev) => {
          return {
            ...prev,
            isPlaying: true,
          };
        });
      } else if (event.target.getPlayerState() === 2) {
        setCurrentPlayer((prev) => {
          return {
            ...prev,
            isPaused: true,
          };
        });
      }
    }
    console.log("state2", event.target.getPlayerState());

    // alert("state" + event.target.getPlayerState());

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
      autoplay: 1,
      // mute: 1,
      playsinline: 1,
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
        // style={{
        //   position: "absolute",
        //   top: 0,
        //   left: 0,
        //   width: 1,
        //   height: 1,
        //   opacity: 0,
        //   pointerEvents: "none",
        // }}
      />
    </>
  );
}

export default YoutubeContainer;
