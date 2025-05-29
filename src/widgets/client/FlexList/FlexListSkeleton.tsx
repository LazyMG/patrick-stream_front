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
`;

const FlexListHeaderSkeleton = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding-top: 10px;
`;

const FlexListSectionSkeleton = styled.div`
  font-weight: bold;
  height: 60px;
  width: 40%;
  border-radius: 10px;

  background-color: #2e2e2e;
`;

const FlexListContainerSkeleton = styled.div`
  width: 100%;
`;

const FlexListSwiperSkeleton = styled.div`
  display: flex;
  gap: 15px;
  overflow: hidden;
`;

const FlexListItemSkeleton = styled.div`
  /* width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 5px; */
  flex: 0 0 50%; /* 기본: 2개 */

  @media (min-width: 640px) {
    flex: 0 0 calc((100% - 2 * 15px) / 3); /* 3개 + gap 고려 */
  }

  @media (min-width: 768px) {
    flex: 0 0 calc((100% - 3 * 15px) / 4); /* 4개 */
  }

  @media (min-width: 1280px) {
    flex: 0 0 calc((100% - 5 * 15px) / 6); /* 6개 */
  }

  width: auto; /* 너비는 flex 기준 */
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 5px;
`;

const FlexListItemImageSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const FlexListItemInfoSkeleton = styled.div`
  width: 100%;
  border-radius: 10px;

  height: 37px;
  background-color: #2e2e2e;
`;

const FlexListSkeleton = () => {
  return (
    <Wrapper>
      <FlexListHeaderSkeleton>
        <FlexListSectionSkeleton />
      </FlexListHeaderSkeleton>
      <FlexListContainerSkeleton>
        <FlexListSwiperSkeleton>
          {Array.from({ length: 6 }).map((_, idx) => (
            <FlexListItemSkeleton key={idx}>
              <FlexListItemImageSkeleton />
              <FlexListItemInfoSkeleton />
            </FlexListItemSkeleton>
          ))}
        </FlexListSwiperSkeleton>
      </FlexListContainerSkeleton>
    </Wrapper>
  );
};

export default FlexListSkeleton;
