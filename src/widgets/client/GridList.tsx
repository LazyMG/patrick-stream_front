import styled from "styled-components";
import Swiper from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Grid, Scrollbar } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/scrollbar";
import { useRef, useState } from "react";
import SliderButtonSection from "./SliderButtonSection";

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding-top: 10px;
`;

const DefaultSection = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 45px;
`;

const ListContainer = styled.div`
  width: 100%;
  color: #fff;

  /* Custom Scrollbar Style */
  .swiper-scrollbar {
    background-color: #1c1c1c; /* 트랙 색상 */
    height: 5px; /* 스크롤바의 높이 조정 */
    border-radius: 0;
  }

  .swiper-scrollbar-drag {
    background-color: #606060; /* 핸들 색상 */
    height: 5px; /* 스크롤바의 높이 조정 */
    border-radius: 0;
  }

  /* For browsers that support the standard scrollbar styling */
  .swiper-scrollbar {
    scrollbar-color: #606060 #1c1c1c; /* 핸들 및 트랙 색상 */
    scrollbar-width: thin; /* 스크롤바 두께를 'thin', 'auto', 'none' 중 선택 가능 */
  }
`;

const ListItem = styled.div`
  width: 410px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Image = styled.div<{ $imgUrl: string }>`
  border-radius: 2px;
  height: 100%;
  aspect-ratio: 1 / 1;
  background: ${({ $imgUrl }) => `url(${$imgUrl})`};
  background-size: cover;
  flex-shrink: 0;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
`;

const Title = styled.div`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;
`;

const Description = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const GridList = () => {
  const swiperRef = useRef<Swiper | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const goNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <Wrapper>
      <ListHeader>
        <DefaultSection>빠른 선곡</DefaultSection>
        <SliderButtonSection
          isBeginning={isBeginning}
          isEnd={isEnd}
          goPrev={goPrev}
          goNext={goNext}
        />
      </ListHeader>
      <ListContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SwiperComponent
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Grid, Scrollbar]}
            grid={{
              rows: 4, // 4행 구성
              fill: "row", // 열을 기준으로 그리드 채우기
            }}
            slidesPerView={3} // 한 번에 3개의 슬라이드 보이게 설정
            spaceBetween={10} // 슬라이드 간의 간격 설정
            // style={{ width: "600px" }} // 보이는 영역의 너비를 설정하여 3열이 보이도록 조절
            allowTouchMove={false}
            scrollbar={{ draggable: true }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => {
              setIsBeginning(false);
              setIsEnd(false);
            }}
            style={{ paddingBottom: "15px" }}
          >
            {Array.from({ length: 20 }).map((_, idx) => (
              <SwiperSlide key={idx}>
                <ListItem>
                  <Image
                    $imgUrl={
                      "https://i.scdn.co/image/ab67616d00001e02ff1533e6c9c6435c37759764"
                    }
                  />
                  <Info>
                    <Title>{"세탁소"}</Title>
                    <Description>
                      {"유라"}|{"세탁소"}
                    </Description>
                  </Info>
                </ListItem>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
      </ListContainer>
    </Wrapper>
  );
};

export default GridList;
