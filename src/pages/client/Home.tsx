import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ContentGenre = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;

  /* background-color: blue; */
`;

const GenreItem = styled.div`
  width: 120px;
  display: flex;
  justify-content: center;
  padding: 10px 0;

  border-radius: 15px;

  cursor: pointer;
  background-color: green;
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const ContentComponent = styled.div`
  width: 100%;
  min-height: 300px;
  background-color: aquamarine;
`;

const Home = () => {
  return (
    <Wrapper>
      <ContentGenre>
        {Array.from({ length: 5 }).map((_, idx) => (
          <GenreItem key={idx}>장르1</GenreItem>
        ))}
      </ContentGenre>
      <ContentContainer>
        {Array.from({ length: 10 }).map((_, idx) => (
          <ContentComponent key={idx} />
        ))}
      </ContentContainer>
    </Wrapper>
  );
};

export default Home;