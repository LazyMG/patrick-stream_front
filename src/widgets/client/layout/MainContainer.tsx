import { ReactNode, useCallback, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import PlayBar from "./../PlayBar";
import YoutubeContainer from "../../YoutubeContainer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isPlayerOnState } from "../../../app/entities/player/atom";
import {
  backgroundState,
  globalToastConfigState,
} from "../../../app/entities/global/atom";
import { playingPlaylistState } from "../../../app/entities/music/atom";
import { loginUserDataState, userState } from "../../../app/entities/user/atom";
import { useLocation } from "react-router-dom";
import ToastContainer from "./../ToastContainer";
import { useLoginUser } from "../../../shared/hooks/useLoginUser";
import { useToast } from "../../../shared/hooks/useToast";

// const Wrapper = styled.div<{
//   $backImg?: string | null;
//   $isSideBarChange: boolean;
// }>`
//   display: flex;
//   flex-direction: column;
//   margin-left: 250.5px;
//   padding-left: 250.5px;
//   /* background: ${(props) =>
//     props?.$backImg
//       ? `none`
//       : `radial-gradient(circle at top left, #281a29 3%, #0a0a0a 20%)`}; */

//   /* min-height: 100vh; */
//   height: 100vh;
//   box-sizing: border-box;

//   background-attachment: local;

//   position: relative;

//   overflow-y: scroll;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   ${(props) =>
//     props.$isSideBarChange &&
//     css`
//       margin-left: 0px;

//       background: none;
//     `}

//   /* 화면 너비에 따라 패딩을 다르게 설정 */
//   @media (max-width: 2800px) {
//     padding: 0 18%;
//   }

//   @media (max-width: 1800px) {
//     padding: 0 8%;
//   }

//   @media (max-width: 940px) {
//     margin-left: 0px;
//     background: none;
//   }

//   @media (max-width: 614px) {
//     margin-left: 0px;
//     padding: 0 6%;
//     /* background: none; */
//     -webkit-overflow-scrolling: touch;
//   }

//   background-color: blue !important;
// `;

const Wrapper = styled.div<{
  $backImg?: string | null;
  $isSideBarChange: boolean;
}>`
  display: flex;
  flex-direction: column; /* 내부 Content를 수직으로 배치하기 위함 */
  position: relative;

  background: ${(props) =>
    props?.$backImg
      ? `none`
      : `radial-gradient(circle at top left, #281a29 3%, #0a0a0a 20%)`};

  /* 부모(Layout Wrapper)의 남은 공간을 모두 차지하도록 설정 */
  flex-grow: 1; /* Layout Wrapper가 flex-direction: column;일 때 남은 수직 공간을 차지 */
  flex-shrink: 0; /* 공간이 부족해도 줄어들지 않도록 */
  flex-basis: auto; /* 기본 크기 설정 */

  /* 기존 margin-left 유지 (Sidebar에 의해 밀리는 공간) */
  margin-left: 250.5px;
  padding-left: 250.5px; /* 아마도 padding도 Sidebar 영향일 듯 */

  /* 이전 height: 100vh; 및 overflow-y: scroll; 제거! */
  /* 이 요소는 이제 스크롤되지 않습니다. */
  overflow-y: hidden; /* 혹시 모를 내부 콘텐츠 넘침으로 인한 Wrapper 스크롤 방지 */

  background-attachment: local;
  position: relative;

  ${(props) =>
    props.$isSideBarChange &&
    css`
      margin-left: 0px;
      background: none;
    `}

  /* @media 쿼리 유지 */
  @media (max-width: 2800px) {
    padding: 0 18%;
  }

  @media (max-width: 1800px) {
    padding: 0 8%;
  }

  @media (max-width: 940px) {
    margin-left: 0px;
    background: none;
  }

  @media (max-width: 614px) {
    margin-left: 0px;
    padding: 0 6%;
    /* -webkit-overflow-scrolling: touch; (여기서는 필요 없음, Content로 이동) */
  }
`;

// const Content = styled.div<{ $isSideBarChange: boolean }>`
//   width: 100%;

//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   gap: 60px;
//   color: white;

//   ${(props) =>
//     props.$isSideBarChange &&
//     css`
//       width: calc(100% - 78px) !important;
//       padding-left: 78px;
//     `}
// `;

// MainContainer.tsx의 Content 컴포넌트
const Content = styled.div<{ $isSideBarChange: boolean }>`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 60px;
  color: white;

  /* MainContainer Wrapper의 남은 공간을 모두 차지하도록 설정 */
  flex-grow: 1; /* 부모(Wrapper)의 남은 수직 공간을 모두 차지 */
  flex-shrink: 0;
  flex-basis: auto; /* 또는 flex-basis: 0; Flex 컨테이너 내에서 아이템의 기본 크기를 설정합니다. */

  /* 🌟🌟🌟 가장 중요한 변경: Content의 높이를 부모의 남은 공간으로 제한하고 스크롤 허용 🌟🌟🌟 */
  height: 0; /* flex-grow가 1일 때, 이 값을 0으로 설정하면 남은 공간을 정확히 채웁니다. */
  min-height: 0; /* flex 컨테이너의 자식에게 min-height 기본값(auto)이 콘텐츠 크기에 따라 커지는 것을 방지 */

  overflow-y: auto; /* 내용이 넘칠 때만 세로 스크롤바 표시 */
  -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤 활성화 */

  /* 스크롤바 숨김 (선택 사항 - 일단 주석 해제하여 스크롤바가 보이는지 확인) */
  &::-webkit-scrollbar {
    display: none;
  }

  ${(props) =>
    props.$isSideBarChange &&
    css`
      width: calc(100% - 78px) !important;
      padding-left: 78px;
    `}

  padding-top: 100px;
`;

const ConentContainer = styled.div`
  width: 100%;
  /* margin-top: 100px; */
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
  isSideBarChange: boolean;
}

const MainContainer = ({
  children,
  onScroll,
  isSideBarChange,
}: IMainContainer) => {
  const user = useRecoilValue(userState);
  const setLoginUserData = useSetRecoilState(loginUserDataState);
  const { initiateLoginUserData } = useLoginUser();
  const globalToastConfig = useRecoilValue(globalToastConfigState);
  const { setGlobalToast } = useToast();

  const location = useLocation();

  const getUserProfile = async (id: string) => {
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/user/${id}`,
      {
        credentials: "include",
      }
    ).then((res) => res.json());
    if (result.ok) {
      setLoginUserData(result.user);
      initiateLoginUserData(result.user);
    } else {
      if (!result.error) {
        if (result.type === "ERROR_ID") {
          setGlobalToast("잘못된 데이터입니다.", "CURRENT_USER_ERROR_ID_ERROR");
        } else if (result.type === "NO_DATA") {
          setGlobalToast(
            "존재하지 않는 데이터입니다.",
            "CURRENT_USER_NO_DATA_ERROR"
          );
        }
      } else {
        setGlobalToast("일시적인 오류입니다.", "CURRENT_USER_DB_ERROR");
      }
    }
  };

  useEffect(() => {
    if (user.userId !== "") {
      getUserProfile(user.userId);
    }
  }, [user.userId]);

  const setPlayingPlaylist = useSetRecoilState(playingPlaylistState);

  const getMusics = useCallback(async () => {
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/music/recently-updated`
    ).then((res) => res.json());
    if (result.ok) {
      setPlayingPlaylist(result.musics);
    }
  }, [setPlayingPlaylist]);

  useEffect(() => {
    getMusics();
  }, [getMusics]);

  const wrapperRef = useRef<HTMLDivElement>(null);

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
    <Wrapper
      // ref={wrapperRef}
      $backImg={background?.src}
      $isSideBarChange={isSideBarChange}
    >
      {background &&
        (background.type === "blur" ? (
          <BlurBackImage $backImg={background.src} />
        ) : (
          <SimpleBackImage $backImg={background.src} />
        ))}
      <Content $isSideBarChange={isSideBarChange} ref={wrapperRef}>
        <ConentContainer>{children}</ConentContainer>
        <Footer />
      </Content>
      {isPlayerOn && <PlayBar />}
      {globalToastConfig &&
        globalToastConfig.toasts.length !== 0 &&
        globalToastConfig.toasts.map((item) => (
          <ToastContainer
            closeToast={() => globalToastConfig.closeToast(item.toastKey)}
            text={item.text}
            key={item.toastKey}
          />
        ))}
      <YoutubeContainer />
    </Wrapper>
  );
};

export default MainContainer;
