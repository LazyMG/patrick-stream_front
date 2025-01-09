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
  height: 50px;
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
`;

const FlexListItemSkeleton = styled.div`
  width: 100%;

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
