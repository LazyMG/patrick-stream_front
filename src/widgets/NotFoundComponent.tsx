import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 70vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 64px;
  font-weight: bold;

  @media (max-width: 614px) {
    font-size: 56px;
  }
`;

const NotFoundComponent = () => {
  return <Wrapper>Not Found</Wrapper>;
};

export default NotFoundComponent;
