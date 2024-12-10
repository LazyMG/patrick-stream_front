import styled from "styled-components";
import Swiper from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import "swiper/swiper-bundle.css";
import "swiper/css/scrollbar";
import { ReactNode, useRef, useState } from "react";
import SliderButtonSection from "./SliderButtonSection";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ytIdState } from "../../app/entities/music/atom";

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

const CustomSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CustomIcon = styled.div`
  svg {
    width: 75px;
  }
`;

const CustomUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;
`;

const CustomUserName = styled.div``;

const CustomTitle = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 45px;
`;

const ListItem = styled.div`
  width: 100%; /* 부모 컨테이너에 맞춰 유연하게 설정 */
  //max-width: 180px; /* 최대 너비 제한 */
  flex: 1 1 auto; /* 유연한 크기 조정 */
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 5px;
  /* background-color: coral; */
`;

const Image = styled.div`
  width: 100%; /* 부모에 맞춰 너비 설정 */
  aspect-ratio: 1 / 1; /* 정사각형 비율 유지 */

  background-color: brown;

  border-radius: 10px;
`;

const Info = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 5px;

  font-size: 16px;
`;

const Title = styled.span`
  font-weight: bold;

  cursor: pointer;
`;

const Description = styled.div`
  display: flex;
  gap: 2px;
`;

const Category = styled.span``;

const Aritst = styled.span`
  a {
    color: #fff;
    text-decoration: none;
  }
`;

// 전체 컨테이너
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

interface IFlexList {
  isCustom: boolean;
  icon?: ReactNode;
  title: string;
  info?: string;
}

const FlexList = ({ isCustom, icon, title, info }: IFlexList) => {
  const swiperRef = useRef<Swiper | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const setYtId = useSetRecoilState(ytIdState);

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

  const changeYtId = (ytId: string) => {
    setYtId(ytId);
  };

  return (
    <Wrapper>
      <ListHeader>
        {isCustom ? (
          <CustomSection>
            <CustomIcon>{icon}</CustomIcon>
            <CustomUserInfo>
              {info && <CustomUserName>{info}</CustomUserName>}
              <CustomTitle>{title}</CustomTitle>
            </CustomUserInfo>
          </CustomSection>
        ) : (
          <DefaultSection>{title}</DefaultSection>
        )}
        <SliderButtonSection
          isBeginning={isBeginning}
          isEnd={isEnd}
          goPrev={goPrev}
          goNext={goNext}
        />
      </ListHeader>
      <ListContainer>
        <div>
          <SwiperComponent
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Scrollbar]}
            slidesPerView={6} // 한 번에 6개의 슬라이드 보이게 설정
            spaceBetween={15} // 슬라이드 간의 간격 설정
            slidesPerGroup={1} // 한 번에 2개의 슬라이드를 이동
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
            {Array.from({ length: 10 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ListItem>
                  <Image />
                  <Info>
                    <Title onClick={() => changeYtId("3xcIJAWchdk")}>
                      세탁소
                    </Title>
                    <Description>
                      <Category>앨범</Category>
                      <Aritst onClick={() => console.log("artist")}>
                        <Link to={"/artists/123"}>유라</Link>
                      </Aritst>
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

export default FlexList;
