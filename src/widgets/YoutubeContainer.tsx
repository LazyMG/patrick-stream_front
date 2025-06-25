// import YouTube, { YouTubeProps } from "react-youtube";
// import { ytIdState } from "../app/entities/music/atom";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import {
//   currentPlayerState,
//   playerInstanceAtom,
//   ytPlayerState,
// } from "../app/entities/player/atom";

// interface IYoutubeContainer {
//   setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
//   player: YT.Player | null;
// }

// function YoutubeContainer({ player, setPlayer }: IYoutubeContainer) {
//   const ytId = useRecoilValue(ytIdState);
//   const setytPlayer = useSetRecoilState(ytPlayerState);
//   const currentPlayer = useRecoilValue(currentPlayerState);
//   const setPlayerInstance = useSetRecoilState(playerInstanceAtom);

//   // 전체 플레이어 관리
//   const onPlayerReady: YouTubeProps["onReady"] = (event) => {
//     setPlayer(event.target);
//     setPlayerInstance(event.target);
//     // console.dir(event.target);
//     // console.log("play!", player?.getPlayerState());
//     // console.log("ready");
//     // console.log("currentPlayer", currentPlayer.isPaused);

//     if (currentPlayer.isRedirectPaused) {
//       // console.log("true");
//       event.target.pauseVideo();
//     }

//     if (player) {
//       event.target.setVolume(currentPlayer.volume);
//     }

//     if (player && currentPlayer.isMuted) {
//       event.target.mute();
//     }
//   };

//   const onPlayerPlay: YouTubeProps["onPlay"] = () => {};

//   const onStateChange: YouTubeProps["onStateChange"] = (event) => {
//     setytPlayer(event.target.getPlayerState());

//     if (currentPlayer.isRedirectPaused) {
//       setytPlayer(2);
//     }
//   };

//   const opts: YouTubeProps["opts"] = {
//     // height: "0",
//     // width: "0",
//     height: "390",
//     width: "320",
//     playerVars: {
//       // autoplay: 1,
//       // mute: 1,
//       playsinline: 1,
//     },
//   };

//   return (
//     <>
//       <YouTube
//         videoId={ytId.ytId}
//         opts={opts}
//         onReady={onPlayerReady}
//         onPlay={onPlayerPlay}
//         onStateChange={onStateChange}
//         // style={{
//         //   position: "absolute",
//         //   top: 0,
//         //   left: 0,
//         //   width: 1,
//         //   height: 1,
//         //   opacity: 0,
//         //   pointerEvents: "none",
//         // }}
//       />
//     </>
//   );
// }

// export default YoutubeContainer;

// YoutubeContainer.tsx

import YouTube, { YouTubeProps } from "react-youtube";
import { ytIdState } from "../app/entities/music/atom"; // selectedMusicState 추가
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPlayerState,
  ytPlayerState,
  playerInstanceAtom,
} from "../app/entities/player/atom";
import { useEffect, useRef } from "react"; // useRef 추가

function YoutubeContainer() {
  const ytId = useRecoilValue(ytIdState);
  const setytPlayer = useSetRecoilState(ytPlayerState);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const setPlayerInstance = useSetRecoilState(playerInstanceAtom);
  // const setSelectedMusic = useSetRecoilState(selectedMusicState); // setSelectedMusic 가져오기

  // 플레이어가 사용자의 직접적인 상호작용에 의해 재생될 준비가 되었는지 추적하는 useRef
  const isUserInteractedToPlay = useRef(false);

  // ytId가 변경될 때마다 isUserInteractedToPlay를 리셋합니다.
  useEffect(() => {
    isUserInteractedToPlay.current = false;
  }, [ytId.ytId]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setPlayerInstance(event.target);
    event.target.pauseVideo(); // 초기 로드 시 자동 재생 방지

    // 볼륨 및 뮤트 상태 초기 적용
    event.target.setVolume(currentPlayer.volume);
    if (currentPlayer.isMuted) {
      event.target.mute();
    } else {
      event.target.unMute();
    }
  };

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    const playerState = event.data;
    setytPlayer(playerState); // 플레이어 숫자 상태 업데이트

    // currentPlayerState의 isPlaying 값을 확인하여 재생 의도를 반영
    // YT.PlayerState.CUED (5) 또는 YT.PlayerState.BUFFERING (3) 상태일 때 재생 시도
    // 혹은 YT.PlayerState.UNSTARTED (-1) 상태에서 바로 PLAYING으로 가도 됨
    if (
      (playerState === window.YT.PlayerState.CUED ||
        playerState === window.YT.PlayerState.BUFFERING ||
        playerState === window.YT.PlayerState.UNSTARTED) &&
      currentPlayer.isPlaying // usePlayMusic에서 isPlaying을 true로 설정했는지 확인
    ) {
      // isUserInteractedToPlay.current를 true로 설정하여
      // 다음 플레이어 상태 변경 시 재생이 중복 호출되지 않도록 방지
      if (!isUserInteractedToPlay.current) {
        event.target.playVideo();
        event.target.unMute(); // 소리도 켜줍니다.
        isUserInteractedToPlay.current = true;
        console.log("Auto-playing due to state change and isPlaying intent");
      }
    }

    // 플레이어가 실제로 재생 중이거나 일시정지 중일 때 currentPlayerState 업데이트
    if (playerState === window.YT.PlayerState.PLAYING) {
      setCurrentPlayer((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
        isLoading: false,
        isEnd: false,
      }));
    } else if (playerState === window.YT.PlayerState.PAUSED) {
      setCurrentPlayer((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: true,
        isLoading: false,
      }));
    } else if (playerState === window.YT.PlayerState.ENDED) {
      setCurrentPlayer((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: false,
        isLoading: false,
        isEnd: true,
      }));
      // 재생이 끝났으므로 isUserInteractedToPlay 플래그를 리셋하여 다음 클릭 시 재생 가능하도록
      isUserInteractedToPlay.current = false;
    } else if (playerState === window.YT.PlayerState.BUFFERING) {
      setCurrentPlayer((prev) => ({ ...prev, isLoading: true }));
    } else if (
      playerState === window.YT.PlayerState.UNSTARTED ||
      playerState === window.YT.PlayerState.CUED
    ) {
      setCurrentPlayer((prev) => ({
        ...prev,
        isLoading: true,
        isPlaying: false,
        isPaused: false,
        isEnd: false,
      }));
    }

    // isRedirectPaused 로직은 현재 currentPlayer.isPlaying 로직과 충돌할 수 있으므로
    // 명확한 의도가 아니라면 제거하거나, isPlaying보다 우선순위를 낮게 둬야 합니다.
    // 여기서는 currentPlayer.isPlaying이 true인 경우에만 재생을 시도하도록 했습니다.
    // 만약 리다이렉트 시 무조건 일시정지하려는 의도가 있다면, 이 조건문은 유지해야 합니다.
    if (currentPlayer.isRedirectPaused) {
      event.target.pauseVideo();
      setCurrentPlayer((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: true,
      }));
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "390",
    width: "320",
    playerVars: {
      // autoplay와 mute는 제거합니다. (이전과 동일)
      playsinline: 1,
    },
  };

  return (
    <>
      <YouTube
        videoId={ytId.ytId}
        opts={opts}
        onReady={onPlayerReady}
        onStateChange={onStateChange}
      />
    </>
  );
}

export default YoutubeContainer;
