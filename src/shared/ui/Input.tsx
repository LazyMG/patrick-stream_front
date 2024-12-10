import styled from "styled-components";

const Wrapper = styled.input`
  outline: none;
  border: 2px solid #5f5f5f;
  background-color: transparent;
  padding: 5px 0;
  padding-left: 10px;
  border-radius: 8px;

  color: #fff;

  height: 30px;
  font-size: 15px;

  &:focus {
    border: 2px solid #dbdbdb;
  }

  &::placeholder {
    color: #5f5f5f;
  }
`;

interface IInput {
  type: string;
  placeholder: string;
  id: string;
}
const Input = ({ type, placeholder, id }: IInput) => {
  return <Wrapper type={type} placeholder={placeholder} id={id} />;
};

export default Input;
