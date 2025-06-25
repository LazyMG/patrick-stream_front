// import { useSetRecoilState } from "recoil";
// import {
//   currentPlayerState,
//   isPlayerOnState,
// } from "../../app/entities/player/atom";
// import {
//   playingPlaylistState,
//   selectedMusicState,
//   ytIdState,
// } from "../../app/entities/music/atom";
// import { APIMusic } from "../models/music";
// import { useRecentMusics } from "./useRecentMusics";
// import { updateMusicView } from "../lib/updateMusicView";
// import { useToast } from "./useToast";

// export const usePlayMusic = () => {
//   const setIsPlayerOn = useSetRecoilState(isPlayerOnState);
//   const setYtId = useSetRecoilState(ytIdState);
//   const setCurrentPlayer = useSetRecoilState(currentPlayerState);
//   const setSelectedMusic = useSetRecoilState(selectedMusicState);
//   const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
//   const { addUserRecentMusics } = useRecentMusics();
//   const { setGlobalToast } = useToast();

//   const playMusic = async (music: APIMusic, noSame = false) => {
//     let isSameMusic = false;
//     setSelectedMusic((prev) => {
//       if (prev && prev._id === music._id) {
//         isSameMusic = true;
//         return prev;
//       }
//       const newMusic = {
//         ...music,
//         counts: {
//           likes: music.counts.likes,
//           views: music.counts.views + 1,
//         },
//       };
//       return newMusic;
//     });

//     if (!noSame && isSameMusic) return;

//     setYtId((prev) => {
//       return {
//         stamp: noSame ? Date.now() : prev.stamp,
//         ytId: music.ytId,
//       };
//     });
//     setPlayingPlaylist((prev) => {
//       if (!prev) return prev;
//       const index = prev.findIndex((item) => item._id === music._id);
//       if (index === -1) {
//         return [music, ...prev];
//       }
//       return prev;
//     });
//     setIsPlayerOn(true);
//     setCurrentPlayer((prev) => {
//       return {
//         ...prev,
//         isPlaying: true,
//       };
//     });

//     addUserRecentMusics(music);
//     const updateResult = await updateMusicView(music);
//     if (updateResult.error) {
//       setGlobalToast("Music Error", updateResult.text);
//     }
//   };

//   return playMusic;
// };
import { useSetRecoilState, useRecoilValue } from "recoil"; // useRecoilValue 추가
import {
  currentPlayerState,
  isPlayerOnState,
  playerInstanceAtom, // playerInstanceAtom 임포트
} from "../../app/entities/player/atom";
import {
  playingPlaylistState,
  selectedMusicState,
  ytIdState,
} from "../../app/entities/music/atom";
import { APIMusic } from "../models/music";
import { useRecentMusics } from "./useRecentMusics";
import { updateMusicView } from "../lib/updateMusicView";
import { useToast } from "./useToast";

export const usePlayMusic = () => {
  const setIsPlayerOn = useSetRecoilState(isPlayerOnState);
  const setYtId = useSetRecoilState(ytIdState);
  const setCurrentPlayer = useSetRecoilState(currentPlayerState);
  const setSelectedMusic = useSetRecoilState(selectedMusicState);
  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);
  const { addUserRecentMusics } = useRecentMusics();
  const { setGlobalToast } = useToast();

  // playerInstanceAtom에서 YT.Player 인스턴스를 가져옵니다.
  const player = useRecoilValue(playerInstanceAtom);

  const playMusic = async (music: APIMusic, noSame = false) => {
    let isSameMusic = false;
    setSelectedMusic((prev) => {
      if (prev && prev._id === music._id) {
        isSameMusic = true;
        return prev;
      }
      const newMusic = {
        ...music,
        counts: {
          likes: music.counts.likes,
          views: music.counts.views + 1,
        },
      };
      return newMusic;
    });

    if (!noSame && isSameMusic) {
      // 같은 음악을 클릭했을 때
      if (player && player.getPlayerState() === window.YT.PlayerState.PAUSED) {
        player.playVideo(); // 일시 정지 상태였다면 다시 재생
        setCurrentPlayer((prev) => ({ ...prev, isPlaying: true }));
      }
      return;
    }

    setYtId((prev) => {
      return {
        stamp: noSame ? Date.now() : prev.stamp,
        ytId: music.ytId,
      };
    });
    setPlayingPlaylist((prev) => {
      if (!prev) return prev;
      const index = prev.findIndex((item) => item._id === music._id);
      if (index === -1) {
        return [music, ...prev];
      }
      return prev;
    });
    setIsPlayerOn(true);
    setCurrentPlayer((prev) => {
      return {
        ...prev,
        isPlaying: true, // 재생 상태로 설정
        // isRedirectPaused: false, // 재생 시작 시 isRedirectPaused를 false로 초기화 (필요하다면)
      };
    });

    addUserRecentMusics(music);
    const updateResult = await updateMusicView(music);
    if (updateResult.error) {
      setGlobalToast("Music Error", updateResult.text);
    }
  };

  return playMusic;
};
