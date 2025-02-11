import styled, { keyframes } from "styled-components";

const pulseKeyframes = keyframes`
  0%{
    opacity: 1;
  }
  50%{
    opacity: 0.4;
  }
  100%{
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  animation: ${pulseKeyframes} 2.5s ease-in-out infinite;

  margin-bottom: 10px;
`;

const GirdListHeaderSkeleton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding-top: 10px;
`;

const GridListSectionSkeleton = styled.div`
  font-weight: bold;
  height: 50px;
  width: 40%;
  border-radius: 10px;

  background-color: #2e2e2e;
`;

const GridListContainerSkeleton = styled.div`
  width: 100%;
`;

const GridListSwiperSkeleton = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 15px;
`;

const GridListMusicItemSkeleton = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  gap: 10px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const GridListSkeleton = () => {
  return (
    <Wrapper>
      <GirdListHeaderSkeleton>
        <GridListSectionSkeleton />
      </GirdListHeaderSkeleton>
      <GridListContainerSkeleton>
        <GridListSwiperSkeleton>
          {Array.from({ length: 12 }).map((_, idx) => (
            <GridListMusicItemSkeleton key={idx} />
          ))}
        </GridListSwiperSkeleton>
      </GridListContainerSkeleton>
    </Wrapper>
  );
};

export default GridListSkeleton;
