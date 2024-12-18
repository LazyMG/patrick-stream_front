import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { ytIdState } from "../../app/entities/music/atom";
import {
  currentPlayerState,
  ytPlayerState,
} from "../../app/entities/player/atom";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100vw;

  display: block;
  z-index: 999;

  /* display: ${(props) => (props.$isPlayerOn ? "flex" : "none")}; */
  flex-direction: column;
  align-items: center;
  
  background-color: chartreuse;
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
  height: 2px;
  //background-color: red;

  background: ${(props) => {
    const percentage =
      ((props.value - props.min) / (props.max - props.min)) * 100;
    return `
      linear-gradient(to right, 
        red ${percentage}%, 
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
    background: red;
    cursor: pointer;
    transition: width 0.2s ease, height 0.2s ease;
  }

  &::-moz-range-thumb {
    width: ${(props) => (props.showThumb ? "12px" : "0")};
    height: ${(props) => (props.showThumb ? "12px" : "0")};
    border-radius: 50%;
    background: red;
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

  //background-color: yellow;
`;

const PlayBarContentControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  //background-color: red;
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

const PlayBarContentMainImg = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 5px;
  /* background: ${({ $imgUrl }) => `url(${$imgUrl})`}; */
  //background: url("https://i.scdn.co/image/ab67616d00001e028bcb1a80720292aaffb35989");
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
    background-color: #a9a9a9;
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

  const [isMusicMuted, setMusicIsMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState<number>(50);
  const volumeRef = useRef<HTMLInputElement>(null);

  //노래 재생될 때

  useEffect(() => {
    if (player && player.getPlayerState() === 1) {
      // console.log("playbar", player);
      player.stopVideo();
      player.playVideo();
      setTime("00:00");
      setTimeline(0);
      console.log("playbar volume", player.getVolume());
    }
  }, [player, ytId]);

  // useEffect(() => {
  //   console.log("test", ytPlayer);
  // }, [ytPlayer]);

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
    }
    // 매 초마다 업데이트
    return () => clearInterval(updateTimer);
  }, [time, player, ytPlayer]);

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
              <PlayBarContentControlMoveButton>
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
                    d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                  />
                </svg>
              </PlayBarContentControlMoveButton>
              {(ytPlayer === -1 || ytPlayer === 3) && <div>Loading...</div>}
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
              <PlayBarContentControlMoveButton>
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
                    d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                  />
                </svg>
              </PlayBarContentControlMoveButton>
            </PlayBarContentControlButtons>
            <PlayBarContentControlDuration>
              {time}/{timeline}
            </PlayBarContentControlDuration>
          </PlayBarContentControlContainer>
          <PlayBarContentMainContainer>
            <PlayBarContentMainImg />
            <PlayBarContentMainInfo>
              <PlayBarContentMainInfoTitle>{123}</PlayBarContentMainInfoTitle>
              <PlayBarContentMainInfoOverview>
                <PlayBarContentMainInfoOverviewArtist>
                  {123}
                </PlayBarContentMainInfoOverviewArtist>
                •{" "}
                <PlayBarContentMainInfoOverviewAlbum>
                  {1213}
                </PlayBarContentMainInfoOverviewAlbum>{" "}
                •<span>{123}</span>
              </PlayBarContentMainInfoOverview>
            </PlayBarContentMainInfo>
            <PlayBarContentMainUtil>
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
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                {/* <svg  fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
</svg> */}
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
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
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
