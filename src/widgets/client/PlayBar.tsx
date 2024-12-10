import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { playingState, ytIdState } from "../../app/entities/music/atom";

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100vw;

  display: block;
  z-index: 1;

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
  const playing = useRecoilValue(playingState);
  const ytId = useRecoilValue(ytIdState);

  //노래 재생될 때

  useEffect(() => {
    if (player && player.getPlayerState() === 1) {
      console.log("playbar", player);
      player.stopVideo();
      player.playVideo();
      setTime("00:00");
      setTimeline(0);
    }
  }, [player, ytId]);

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
  }, [time, player, playing]);

  //노래 끝났을 때 처리
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
              <PlayBarContentControlPlayButton>
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
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                />
              </svg> */}

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
              {11}/{123}
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
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>
                {/* <svg
                fill={"none"}
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
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
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
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
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg> */}

              <PlayBarContentUtilVolumeRange type="range" min={0} max={100} />
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
