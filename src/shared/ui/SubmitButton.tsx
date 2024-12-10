import styled from "styled-components";

const Wrapper = styled.button`
  padding: 10px 0;
  width: 100%;

  border-radius: 15px;
  border: none;
  font-size: 16px;
  background-color: #f5a3a5;
  font-weight: bold;
  height: 45px;

  cursor: pointer;

  &:hover {
    background-color: #ffc0c1;
  }
`;

const SubmitButton = ({ text }: { text: string }) => {
  return <Wrapper>{text}</Wrapper>;
};

export default SubmitButton;
