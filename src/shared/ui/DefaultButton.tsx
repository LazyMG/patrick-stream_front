import styled from "styled-components";

export const DefaultButton = styled.button`
  border: 0;
  box-sizing: border-box;
  background: none;
  padding: 6px 15px;
  border-radius: 15px;
  font-size: 15px;

  display: flex;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  @media (max-width: 614px) {
    padding: 4px 10px;
  }
`;
