import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PlayBar from "./PlayBar";
import YoutubeContainer from "../../pages/YoutubeContainer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isPlayerOnState } from "../../app/entities/player/atom";
import {
  backgroundState,
  globalToastConfigState,
} from "../../app/entities/global/atom";
import { playingPlaylistState } from "../../app/entities/music/atom";
import { loginUserDataState, userState } from "../../app/entities/user/atom";
import { useLocation } from "react-router-dom";
import ToastContainer from "./ToastContainer";
import { useLoginUser } from "../../shared/hooks/useLoginUser";

const Wrapper = styled.div<{ $backImg?: string | null }>`
  margin-left: 250.5px;
  padding-left: 250.5px;
  background: ${(props) =>
    props?.$backImg
      ? `none`
      : `radial-gradient(circle at top left, #281a29 3%, #0a0a0a 20%)`};

  min-height: 100vh;

  background-attachment: local;

  position: relative;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  /* 화면 너비에 따라 패딩을 다르게 설정 */
  @media (max-width: 2800px) {
    padding: 0 18%; /* 화면이 1200px 이하일 때 패딩을 6%로 설정 */
  }

  @media (max-width: 1800px) {
    padding: 0 8%; /* 화면이 1200px 이하일 때 패딩을 6%로 설정 */
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 60px;
  color: white;
  /* box-sizing: border-box; */
`;

const ConentContainer = styled.div`
  width: 100%;
  margin-top: 100px;
`;

const Footer = styled.div`
  width: 100%;
  height: 80px;
`;

const BlurBackImage = styled.div<{ $backImg: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  z-index: 0;
  overflow: hidden; /* 넘치는 부분을 가리기 위해 추가 */

  /* 블러 처리된 배경 이미지 */
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: ${(props) =>
      props.$backImg ? `url(${props.$backImg})` : "none"};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; /* 이미지가 너비와 높이를 모두 채우도록 설정 */
    filter: blur(20px); /* 블러 강도 조정 */
    z-index: -2; /* 가장 뒤에 배치 */
  }

  /* 페이드 아웃을 위한 어두운 그라데이션 오버레이 */
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 60%,
      rgba(0, 0, 0, 0.9) 100%,
      #000 100%
    );
    z-index: -1;
  }

  @media (max-width: 1200px) {
    height: 60vh;
  }

  @media (max-width: 768px) {
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

const SimpleBackImage = styled.div<{ $backImg: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  z-index: 0;

  background-image: ${(props) =>
    props.$backImg ? `url(${props.$backImg})` : "none"};

  background-repeat: no-repeat;
  background-position: top center; // 이미지의 상단이 화면 위에 붙도록 설정
  background-size: auto 100%; // 높이를 요소에 맞추고, 너비는 비율 유지 */

  /* 그라데이션으로 아래쪽 페이드 효과 적용 */
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  );

  /* 반응형으로 높이를 점진적으로 조정 */
  @media (max-width: 1200px) {
    height: 60vh;
  }

  @media (max-width: 768px) {
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

interface IMainContainer {
  children: ReactNode;
  onScroll: (scrollTop: number) => void;
}

const MainContainer = ({ children, onScroll }: IMainContainer) => {
  const user = useRecoilValue(userState);
  const setLoginUserData = useSetRecoilState(loginUserDataState);
  const { initiateLoginUserData } = useLoginUser();
  const globalToastConfig = useRecoilValue(globalToastConfigState);

  const location = useLocation();

  const getUserProfile = useCallback(
    async (id: string) => {
      const result = await fetch(
        `http://localhost:5000/user/${id}`
      ).then((res) => res.json());
      if (result.ok) {
        // console.log("로그인한 사용자의 정보", result.user);
        setLoginUserData(result.user);
        initiateLoginUserData(result.user);
      }
    },
    [setLoginUserData, initiateLoginUserData]
  );

  useEffect(() => {
    if (user.userId !== "") {
      getUserProfile(user.userId);
    }
  }, [user.userId, getUserProfile]);

  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);

  const getMusics = useCallback(async () => {
    const result = await fetch(
      `http://localhost:5000/music/recently-updated`
    ).then((res) => res.json());
    if (result.ok) {
      setPlayingPlaylist(result.musics);
    }
  }, [setPlayingPlaylist]);

  useEffect(() => {
    getMusics();
  }, [getMusics]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [player, setPlayer] = useState<YT.Player | null>(null);
  const background = useRecoilValue(backgroundState);
  const isPlayerOn = useRecoilValue(isPlayerOnState);

  const handleScroll = useCallback(() => {
    if (wrapperRef.current) {
      onScroll(wrapperRef.current.scrollTop);
    }
  }, [onScroll]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    wrapper?.addEventListener("scroll", handleScroll);

    return () => {
      wrapper?.removeEventListener("scroll", handleScroll);
    };
  }, [onScroll, handleScroll]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    wrapper?.scrollTo(0, 0);
  }, [location]);

  return (
    <Wrapper ref={wrapperRef} $backImg={background?.src}>
      {background &&
        (background.type === "blur" ? (
          <BlurBackImage $backImg={background.src} />
        ) : (
          <SimpleBackImage $backImg={background.src} />
        ))}
      <Content>
        <ConentContainer>{children}</ConentContainer>
        <Footer />
      </Content>
      {isPlayerOn && <PlayBar player={player} setPlayer={setPlayer} />}
      {globalToastConfig &&
        globalToastConfig.toasts.length !== 0 &&
        globalToastConfig.toasts.map((item) => (
          <ToastContainer
            closeToast={() => globalToastConfig.closeToast(item.key)}
            text={item.text}
            key={item.key}
          />
        ))}
      <YoutubeContainer player={player} setPlayer={setPlayer} />
    </Wrapper>
  );
};

export default MainContainer;
