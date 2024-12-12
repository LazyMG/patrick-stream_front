import styled from "styled-components";
import Input from "./Input";
import { UseFormRegisterReturn } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  /* background-color: blue; */
`;

const Label = styled.label`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
`;

interface IInputRow {
  id: string;
  type: string;
  name: string;
  placeHolder: string;
  register: UseFormRegisterReturn;
}

const InputRow = ({ id, name, placeHolder, type, register }: IInputRow) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{name}</Label>
      <Input type={type} placeholder={placeHolder} id={id} {...register} />
    </Wrapper>
  );
};

export default InputRow;
