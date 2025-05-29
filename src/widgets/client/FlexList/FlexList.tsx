import styled from "styled-components";
import Swiper from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import "swiper/swiper-bundle.css";
import "swiper/css/scrollbar";
import { ReactNode, useRef, useState } from "react";
import SliderButtonSection from "./../SliderButtonSection";
import { APIMusic } from "../../../shared/models/music";
import FlexListMusicItem from "./FlexListMusicItem";
import { APIAlbum } from "../../../shared/models/album";
import { APIArtist } from "../../../shared/models/artist";
import FlexListAritstItem from "./FlexListArtistItem";
import { APIPlaylist } from "../../../shared/models/playlist";
import FlexlistPlaylistItem from "./FlexlistPlaylistItem";
import FlexListAlbumItem from "./FlexAlbumListItem";

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
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DefaultInfo = styled.span`
  color: #b5b5b5;
  font-weight: 100;
`;

const CustomSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const CustomIcon = styled.div`
  cursor: pointer;
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

  @media (max-width: 940px) {
    font-size: 36px;
  }
  @media (max-width: 614px) {
    font-size: 28px;
  }
`;

// 전체 컨테이너
const ListContainer = styled.div`
  width: 100%;
  color: #fff;

  &:hover .swiper-scrollbar {
    opacity: 1;
  }

  /* Custom Scrollbar Style */
  .swiper-scrollbar {
    background-color: #1c1c1c; /* 트랙 색상 */
    height: 5px; /* 스크롤바의 높이 조정 */
    border-radius: 0;

    opacity: 0;
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
  onClick?: () => void;
  buttonFunc?: () => void;
  list?: APIMusic[] | APIAlbum[] | APIArtist[] | APIPlaylist[];
  listFlag: "music" | "album" | "playlist" | "artist";
  isMore: boolean;
}

const PERVIEW = 4;

const FlexList = ({
  isCustom,
  icon,
  title,
  info,
  onClick,
  list,
  listFlag,
  buttonFunc,
  isMore = false,
}: IFlexList) => {
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

  const isActive = !!list && list.length > PERVIEW;

  return (
    <Wrapper>
      <ListHeader>
        {isCustom ? (
          <CustomSection>
            <CustomIcon onClick={onClick}>{icon}</CustomIcon>
            <CustomUserInfo>
              {info && <CustomUserName>{info}</CustomUserName>}
              <CustomTitle>{title}</CustomTitle>
            </CustomUserInfo>
          </CustomSection>
        ) : (
          <DefaultSection>
            {info && <DefaultInfo>{info}</DefaultInfo>}
            <CustomTitle>{title}</CustomTitle>
          </DefaultSection>
        )}
        <SliderButtonSection
          isBeginning={isBeginning}
          isEnd={isEnd}
          goPrev={goPrev}
          goNext={goNext}
          isActive={isActive || isMore}
          onClick={buttonFunc}
        />
      </ListHeader>
      <ListContainer>
        <div>
          <SwiperComponent
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Scrollbar]}
            // slidesPerView={PERVIEW} // 한 번에 6개의 슬라이드 보이게 설정
            spaceBetween={15} // 슬라이드 간의 간격 설정
            slidesPerGroup={1} // 한 번에 1개의 슬라이드를 이동
            allowTouchMove={false}
            scrollbar={{ draggable: true }}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={() => {
              setIsBeginning(false);
              setIsEnd(false);
            }}
            style={{ paddingBottom: "15px" }}
            breakpoints={{
              1280: {
                slidesPerView: 6, //한번에 보이는 슬라이드 개수
              },
              768: {
                slidesPerView: 4, //한번에 보이는 슬라이드 개수
              },
              640: {
                slidesPerView: 3, //한번에 보이는 슬라이드 개수
              },
              0: {
                slidesPerView: 2, //한번에 보이는 슬라이드 개수
              },
            }}
          >
            {list?.map((item) => (
              <SwiperSlide key={item._id}>
                {listFlag === "music" && (
                  <FlexListMusicItem music={item as APIMusic} />
                )}
                {listFlag === "album" && (
                  <FlexListAlbumItem
                    dataType="artist"
                    album={item as APIAlbum}
                  />
                )}
                {listFlag === "artist" && (
                  <FlexListAritstItem artist={item as APIArtist} />
                )}
                {listFlag === "playlist" && (
                  <FlexlistPlaylistItem playlist={item as APIPlaylist} />
                )}
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
      </ListContainer>
    </Wrapper>
  );
};

export default FlexList;
