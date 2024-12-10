import { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PlayBar from "./PlayBar";
import YoutubeContainer from "../../pages/YoutubeContainer";

const Wrapper = styled.div<{ $backImg?: string }>`
  margin-left: 250.5px;
  padding-left: 250.5px;
  background: ${(props) =>
    props?.$backImg
      ? `none`
      : `radial-gradient(circle at top left, #0a262e 3%, #0a0a0a 20%)`};

  min-height: 100vh;

  background-attachment: local;

  overflow-y: auto;

  position: relative;

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
  box-sizing: border-box;
  /* background-color: aquamarine; */
`;

const ConentContainer = styled.div`
  width: 100%;
  margin-top: 100px;
`;

const Footer = styled.div`
  width: 100%;
  height: 80px;
`;

const BackImage = styled.div<{ $backImg: string }>`
  position: absolute; /* fixed 대신 absolute로 설정 */
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
  background-position: top center; /* 이미지의 상단이 화면 위에 붙도록 설정 */
  background-size: auto 100%; // 높이를 요소에 맞추고, 너비는 비율 유지

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
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [player, setPlayer] = useState<YT.Player | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        onScroll(wrapperRef.current.scrollTop);
      }
    };

    const wrapper = wrapperRef.current;
    wrapper?.addEventListener("scroll", handleScroll);

    return () => {
      wrapper?.removeEventListener("scroll", handleScroll);
    };
  }, [onScroll]);

  const isImage = false;

  return (
    <Wrapper
      ref={wrapperRef}
      $backImg="https://i.scdn.co/image/ab6761610000517428f845b9a1c6e8bccb255f0c"
    >
      {isImage && (
        <BackImage $backImg="https://i.scdn.co/image/ab67618600001016ada2ac93d92a298d8f54ebc8" />
      )}
      <Content>
        <ConentContainer>{children}</ConentContainer>
        <Footer />
      </Content>
      <PlayBar player={player} setPlayer={setPlayer} />
      <YoutubeContainer player={player} setPlayer={setPlayer} />
    </Wrapper>
  );
};

export default MainContainer;
