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

const RowListHeaderSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowListSubTitleSkeleton = styled.span`
  height: 15px;
  width: 10%;
  min-width: 100px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const RowListTitleSkeleton = styled.h1`
  height: 32px;
  width: 20%;
  min-width: 180px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const RowListContainerSkeleton = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const RowListMusicItemSkeleton = styled.div`
  width: 100%;
  height: 45px;

  padding: 10px 2px;

  box-sizing: border-box;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const RowListFooterSkeleton = styled.div`
  margin-top: 5px;
  width: 96px;
  height: 32px;

  border-radius: 10px;

  background-color: #2e2e2e;
`;

const RowListSkeleton = () => {
  return (
    <Wrapper>
      <RowListHeaderSkeleton>
        <RowListSubTitleSkeleton />
        <RowListTitleSkeleton />
      </RowListHeaderSkeleton>
      <RowListContainerSkeleton>
        {Array.from({ length: 5 }).map((_, idx) => (
          <RowListMusicItemSkeleton key={idx} />
        ))}
      </RowListContainerSkeleton>
      <RowListFooterSkeleton />
    </Wrapper>
  );
};

export default RowListSkeleton;
