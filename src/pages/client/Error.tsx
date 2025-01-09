import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 70vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 64px;
  font-weight: bold;
`;

const Error = () => {
  return <Wrapper>Error</Wrapper>;
};

export default Error;
