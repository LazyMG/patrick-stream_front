import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  likedMusicsState,
  playlistState,
  selectedMusicState,
  ytIdState,
} from "../../app/entities/music/atom";
import {
  currentPlayerState,
  ytPlayerState,
} from "../../app/entities/player/atom";
import LoadingSpinner from "./LoadingSpinner";
import { setDates, setMusicSeconds } from "../../shared/lib/musicDataFormat";
import { Link } from "react-router-dom";
import { userState } from "../../app/entities/user/atom";
import { usePlayMusic } from "../../shared/hooks/usePlayMusic";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100vw;

  display: block;
  z-index: 999;

  flex-direction: column;
  align-items: center;

  background-color: #212121;

  color: #fff;
`;

interface PlayBarTimelineProps {
  value: number;
  min: number;
  max: number;
  showThumb?: boolean; // 선택적 프로퍼티
}

const PlayBarTimeline = styled.input<PlayBarTimelineProps>`
  -webkit-appearance: none;
  position: absolute;
  top: -2px;
  left: -2px;
  width: 100%;
  height: 3px;

  background: ${(props) => {
    const percentage =
      ((props.value - props.min) / (props.max - props.min)) * 100;
    return `
      linear-gradient(to right, 
        #D2DC23 ${percentage}%, 
        gray ${percentage}%)
    `;
  }};
  transition: height 0.2s ease;

  &:hover {
    height: 4px;
    &::-webkit-slider-thumb {
      width: 15px;
      height: 15px;
    }
    &::-moz-range-thumb {
      width: 15px;
      height: 15px;
    }
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${(props) => (props.showThumb ? "12px" : "0")};
    height: ${(props) => (props.showThumb ? "12px" : "0")};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #d2dc23;
    cursor: pointer;
    transition: width 0.2s ease, height 0.2s ease;
  }

  &::-moz-range-thumb {
    width: ${(props) => (props.showThumb ? "12px" : "0")};
    height: ${(props) => (props.showThumb ? "12px" : "0")};
    border-radius: 50%;
    background: #d2dc23;
    width: 12px;
    height: 12px;
    cursor: pointer;
    transition: width 0.2s ease, height 0.2s ease;
  }

  cursor: pointer;
`;

const PlayBarContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;

  padding: 0 15px;

  box-sizing: border-box;
`;

const PlayBarContentControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const PlayBarContentControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const PlayBarContentControlPlayButton = styled.div`
  width: 45px;

  cursor: pointer;
`;

const PlayBarContentControlMoveButton = styled.div`
  width: 35px;

  cursor: pointer;
`;

const PlayBarContentControlDuration = styled.div`
  font-size: 13px;
`;

const PlayBarContentMainContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PlayBarContentMainImg = styled.div<{ $imgUrl: string }>`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  background: ${(props) => (props.$imgUrl ? `url(${props.$imgUrl})` : "")};
  background-size: cover;
  flex-shrink: 0;
`;

const PlayBarContentMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 300px;
  line-height: 1.3;
`;

const PlayBarContentMainInfoTitle = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayBarContentMainInfoOverview = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  gap: 3px;
  align-items: center;
  a {
    color: #fff;
  }
`;

const PlayBarContentMainInfoOverviewArtist = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PlayBarContentMainInfoOverviewAlbum = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PlayBarContentMainUtil = styled.div`
  display: flex;
  gap: 15px;
`;

const PlayBarContentMainButton = styled.div`
  width: 25px;
  padding: 5px;
  box-sizing: content-box;
  border-radius: 50%;

  cursor: pointer;

  &:hover {
    background-color: #a988bd;
  }

  svg {
  }
`;

const PlayBarContentUtilContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PlayBarContentUtilVolumeButton = styled.div`
  width: 25px;
  position: relative;

  cursor: pointer;

  &:hover {
    input {
      opacity: 1;
    }
  }

  svg:hover {
    opacity: 0.6;
  }
`;

const PlayBarContentUtilVolumeRange = styled.input`
  position: absolute;
  right: 30px;
  top: 9px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  -webkit-appearance: none;
  /* background: ${(props) => {
    const percentage =
      ((props.value - props.min) / (props.max - props.min)) * 100;
    return `
      linear-gradient(to right, 
        white ${percentage}%, 
        gray ${percentage}%)
    `;
  }}; */
  outline: none;
  transition: background 0.2s ease;
  height: 4px;
  width: 80px;

  &:active {
    &::-webkit-slider-thumb {
      width: 12px;
      height: 12px;
    }
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    transition: width height 0.2s ease;
  }

  &::-moz-range-thumb {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
  }
`;

const PlayBarContentRepeatButton = styled.div`
  width: 25px;

  cursor: pointer;

  opacity: ${({ $isRepeat }) => ($isRepeat ? "1" : "0.6")};

  &:hover {
    opacity: ${({ $isRepeat }) => ($isRepeat ? "0.6" : "1")};
  }
`;

const PlayBarContentUtilButton = styled.div`
  width: 25px;

  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

interface IPlayBar {
  setPlayer: React.Dispatch<React.SetStateAction<YT.Player | null>>;
  player: YT.Player | null;
}

const PlayBar = ({ player }: IPlayBar) => {
  const [timeline, setTimeline] = useState(0);
  const [time, setTime] = useState("00:00");
  const [ytPlayer, setYtPlayer] = useRecoilState(ytPlayerState);
  const ytId = useRecoilValue(ytIdState);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(currentPlayerState);
  const selectedMusic = useRecoilValue(selectedMusicState);

  const [isMusicMuted, setMusicIsMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState<number>(50);
  const volumeRef = useRef<HTMLInputElement>(null);

  const user = useRecoilValue(userState);
  const [likedMusics, setLikedMusics] = useRecoilState(likedMusicsState);
  const [isLike, setIsLike] = useState<boolean | null>(null);

  const musicPlaylist = useRecoilValue(playlistState);

  const playMusic = usePlayMusic();

  //노래 재생될 때

  useEffect(() => {
    if (player && player.getPlayerState() === 1) {
      // console.log("playbar", player);
      player.stopVideo();
      player.playVideo();
      setTime("00:00");
      setTimeline(0);
    }
  }, [player, ytId]);

  useEffect(() => {
    if (user.userId !== "" && selectedMusic) {
      const like = likedMusics?.some(
        (music) => music.ytId === selectedMusic.ytId
      );

      if (like !== isLike) {
        setIsLike(!!like);
      }
    }
  }, [selectedMusic, user.userId, likedMusics, isLike]);

  useEffect(() => {
    let updateTimer: number;

    if (player) {
      // console.log("time | isPlaying?", playing, playing === 1);
      if (player.getPlayerState() === 1) {
        updateTimer = setInterval(async () => {
          const currentTime = await player.getCurrentTime();
          setTimeline(Math.floor(currentTime));
          const formatedTime = new Date(currentTime * 1000)
            .toISOString()
            .substring(14, 19);
          setTime(formatedTime);
        }, 1000);
      }
      if (player.getPlayerState() === 0) {
        //
      }
    }
    // 매 초마다 업데이트
    return () => clearInterval(updateTimer);
  }, [time, player, ytPlayer]);

  useEffect(() => {
    if (ytPlayer === 0 && musicPlaylist && selectedMusic) {
      const index = musicPlaylist.findIndex(
        (music) => music._id === selectedMusic._id
      );

      if (index !== -1) {
        const length = musicPlaylist.length;
        // 마지막 곡이 아니라면 다음 곡을 재생
        if (index + 1 < length) {
          setTime("00:00");
          setTimeline(0);
          playMusic(musicPlaylist[index + 1]);
        } else {
          // 마지막 곡이라면 종료 상태로 설정
          setCurrentPlayer((prev) => ({
            ...prev,
            isPlaying: false,
            isEnd: true,
            isPaused: false,
            isLoading: false,
          }));
        }
      }
    }
  }, [ytPlayer]);

  const reStartMusic = () => {
    if (player && player.getPlayerState() === 1) {
      player.stopVideo();
      player.playVideo();
      setTime("00:00");
      setTimeline(0);
    }
  };

  //노래 끝났을 때 처리 필요
  const timelineChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (player) {
      const newTimeline = +event.target.value;
      setTimeline(newTimeline);

      const formatedTime = new Date(newTimeline * 1000)
        .toISOString()
        .substring(14, 19);
      setTime(formatedTime);

      player.seekTo(newTimeline, true);
    }
  };

  const togglePlaying = () => {
    // console.log("currentPlayer", currentPlayer);
    if (player && currentPlayer.isPlaying) {
      player.pauseVideo();
      setYtPlayer(2);
      setCurrentPlayer((prev) => ({
        ...prev,
        isPlaying: false,
        isPaused: true,
      }));
    } else if (player && currentPlayer.isPaused) {
      player.playVideo();
      setYtPlayer(1);
      setCurrentPlayer((prev) => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
      }));
    }
  };

  const clickToggleMute = () => {
    if (player) {
      const isMuted = player.isMuted();
      if (isMuted) {
        //음소거 상태에서 이전 볼륨으로 복귀
        setMusicIsMuted(false);
        setMusicVolume(currentPlayer.volume);
        setCurrentPlayer((prev) => ({
          ...prev,
          isMuted: false,
        }));
        player.unMute();
      } else {
        //재생 상태에서 음소거 상태로, 현재 볼륨 저장
        setMusicIsMuted(true);
        setMusicVolume(0);
        setCurrentPlayer((prev) => ({
          ...prev,
          isMuted: true,
        }));
        player.mute();
      }
    }
  };

  const changeVolume = (event: ChangeEvent<HTMLInputElement>) => {
    if (player) {
      if (volumeRef.current) {
        volumeRef.current.value = event.target.value;
      }
      setMusicVolume(+event.target.value);

      player.setVolume(+event.target.value);

      setCurrentPlayer((prev) => ({
        ...prev,
        volume: +event.target.value,
      }));

      if (+event.target.value === 0) {
        setMusicIsMuted(true);
        setCurrentPlayer((prev) => ({
          ...prev,
          isMuted: true,
          volume: 0,
        }));
      } else {
        setMusicIsMuted(false);
      }
    }
  };

  const onClickLikeButton = async () => {
    if (!selectedMusic || user.userId === "") return;
    const index = likedMusics?.findIndex(
      (music) => music.ytId === selectedMusic.ytId
    );
    if (index === -1 || typeof index === "undefined") {
      // index가 undefined면 좋아요 목록에 없음 -> 추가 필요
      setLikedMusics((prev) => {
        if (!prev) return prev;
        return [selectedMusic, ...prev];
      });

      await fetch(`http://localhost:5000/user/${user.userId}/likedMusics`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addMusic: true, musicId: selectedMusic._id }),
      });
      setIsLike(true);
    } else {
      // index가 있으면 좋아요 목록에 있음 -> 삭제 필요
      setLikedMusics((prev) => {
        if (!prev) return prev;
        return [...prev.filter((music) => music.ytId !== selectedMusic.ytId)];
      });

      await fetch(`http://localhost:5000/user/${user.userId}/likedMusics`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ addMusic: false, musicId: selectedMusic._id }),
      });
      setIsLike(false);
    }
  };

  const playPrevMusic = () => {
    if (
      !musicPlaylist ||
      !musicPlaylist.some((music) => music._id === selectedMusic?._id)
    )
      return;

    if (timeline < 4 && selectedMusic) {
      reStartMusic();
    }
    const index = musicPlaylist.findIndex(
      (music) => music._id === selectedMusic?._id
    );
    // first music
    if (index === 0) return;
    playMusic(musicPlaylist[index - 1]);
  };

  const playNextMusic = () => {
    if (
      !musicPlaylist ||
      !musicPlaylist.some((music) => music._id === selectedMusic?._id)
    )
      return;
    const length = musicPlaylist.length;
    const index = musicPlaylist.findIndex(
      (music) => music._id === selectedMusic?._id
    );
    // last music
    if (index + 1 === length) return;
    playMusic(musicPlaylist[index + 1]);
  };

  return (
    <Wrapper>
      <>
        <PlayBarTimeline
          type="range"
          value={timeline}
          min={0}
          max={player?.getDuration() || 0}
          onChange={timelineChange}
        />
        <PlayBarContentContainer>
          <PlayBarContentControlContainer>
            <PlayBarContentControlButtons>
              <PlayBarContentControlMoveButton onClick={playPrevMusic}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36px"
                  viewBox="0 -960 960 960"
                  width="36px"
                  fill="#fff"
                >
                  <path d="M220-273.33v-413.34q0-14.16 9.62-23.75 9.61-9.58 23.83-9.58 14.22 0 23.72 9.58 9.5 9.59 9.5 23.75v413.34q0 14.16-9.62 23.75-9.62 9.58-23.83 9.58-14.22 0-23.72-9.58-9.5-9.59-9.5-23.75Zm468-2.34L430-452.33q-7.67-5.34-11.17-12.37-3.5-7.03-3.5-15.3t3.5-15.3q3.5-7.03 11.17-12.37l258-176.66q4.33-3.34 9-4.67t9.67-1.33q13.33 0 23.33 9.16Q740-672 740-657v354q0 15-10 24.17-10 9.16-23.33 9.16-5 0-9.67-1.33t-9-4.67ZM673.33-480Zm0 113.33v-226.66L507.33-480l166 113.33Z" />
                </svg>
              </PlayBarContentControlMoveButton>
              {ytPlayer === -1 || ytPlayer === 3 ? (
                <LoadingSpinner />
              ) : (
                <PlayBarContentControlPlayButton onClick={togglePlaying}>
                  {currentPlayer.isPlaying ? (
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                      />
                    </svg>
                    // <svg
                    //   xmlns="http://www.w3.org/2000/svg"
                    //   height="52px"
                    //   viewBox="0 -960 960 960"
                    //   width="52px"
                    //   fill="#fff"
                    // >
                    //   <path d="M320-202v-560l440 280-440 280Zm66.67-280Zm0 158.67L636-482 386.67-640.67v317.34Z" />
                    // </svg>
                  )}

                  {/* <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                />
              </svg> */}
                </PlayBarContentControlPlayButton>
              )}

              <PlayBarContentControlMoveButton onClick={playNextMusic}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36px"
                  viewBox="0 -960 960 960"
                  width="36px"
                  fill="#fff"
                >
                  <path d="M673.33-273.33v-413.34q0-14.16 9.62-23.75 9.62-9.58 23.83-9.58 14.22 0 23.72 9.58 9.5 9.59 9.5 23.75v413.34q0 14.16-9.62 23.75-9.61 9.58-23.83 9.58-14.22 0-23.72-9.58-9.5-9.59-9.5-23.75ZM220-303v-354q0-15 10-24.17 10-9.16 23.33-9.16 5 0 9.67 1.33t9 4.67l258 176.66q7.67 5.34 11.17 12.37 3.5 7.03 3.5 15.3t-3.5 15.3q-3.5 7.03-11.17 12.37L272-275.67q-4.33 3.34-9 4.67t-9.67 1.33q-13.33 0-23.33-9.16Q220-288 220-303Zm66.67-177Zm0 113.33 166-113.33-166-113.33v226.66Z" />
                </svg>
              </PlayBarContentControlMoveButton>
            </PlayBarContentControlButtons>
            <PlayBarContentControlDuration>
              {time}/{setMusicSeconds(selectedMusic?.duration)}
            </PlayBarContentControlDuration>
          </PlayBarContentControlContainer>
          <PlayBarContentMainContainer>
            <PlayBarContentMainImg
              $imgUrl={selectedMusic ? selectedMusic.coverImg : ""}
            />
            <PlayBarContentMainInfo>
              <PlayBarContentMainInfoTitle>
                {selectedMusic?.title}
              </PlayBarContentMainInfoTitle>
              <PlayBarContentMainInfoOverview>
                <PlayBarContentMainInfoOverviewArtist>
                  <Link to={`/artists/${selectedMusic?.artists[0]._id}`}>
                    {selectedMusic?.artists[0].artistname}
                  </Link>
                </PlayBarContentMainInfoOverviewArtist>
                •{" "}
                <PlayBarContentMainInfoOverviewAlbum>
                  <Link to={`/albums/${selectedMusic?.album._id}`}>
                    {selectedMusic?.album.title}
                  </Link>
                </PlayBarContentMainInfoOverviewAlbum>{" "}
                •<span>{setDates(selectedMusic?.released_at, 1)}</span>
              </PlayBarContentMainInfoOverview>
            </PlayBarContentMainInfo>
            <PlayBarContentMainUtil>
              <PlayBarContentMainButton onClick={onClickLikeButton}>
                {isLike ? (
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    />
                  </svg>
                ) : (
                  <svg
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                )}
              </PlayBarContentMainButton>
              <PlayBarContentMainButton>
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </PlayBarContentMainButton>
            </PlayBarContentMainUtil>
          </PlayBarContentMainContainer>
          <PlayBarContentUtilContainer>
            <PlayBarContentUtilVolumeButton>
              {isMusicMuted ? (
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  onClick={clickToggleMute}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  onClick={clickToggleMute}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                  />
                </svg>
              )}
              <PlayBarContentUtilVolumeRange
                type="range"
                value={musicVolume}
                min={0}
                max={100}
                onChange={changeVolume}
                ref={volumeRef}
              />
            </PlayBarContentUtilVolumeButton>
            <PlayBarContentRepeatButton>
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                />
              </svg>
            </PlayBarContentRepeatButton>
            <PlayBarContentUtilButton>
              {/* <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg> */}
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                />
              </svg>
            </PlayBarContentUtilButton>
            <PlayBarContentUtilButton>
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
              {/* <svg
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg> */}
            </PlayBarContentUtilButton>
          </PlayBarContentUtilContainer>
        </PlayBarContentContainer>
      </>
    </Wrapper>
  );
};

export default PlayBar;
