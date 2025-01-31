import styled from "styled-components";

const Wrapper = styled.button`
  padding: 10px 0;
  width: 100%;

  border-radius: 15px;
  border: none;
  font-size: 16px;
  background-color: ${(props) => props.theme.color.pink};
  font-weight: bold;
  height: 45px;

  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.sub_pink};
  }
`;

interface ISubmitButton {
  text: string;
}

const SubmitButton = ({ text }: ISubmitButton) => {
  return <Wrapper>{text}</Wrapper>;
};

export default SubmitButton;
