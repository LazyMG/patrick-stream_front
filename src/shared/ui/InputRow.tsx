import styled from "styled-components";
import Input from "./Input";
import { UseFormRegisterReturn } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  width: fit-content;
`;

const CustomDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 15px;
`;

const ConfirmButton = styled.button`
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

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

interface IInputRow {
  id: "email" | "username" | "password" | "passwordConfirm";
  type: string;
  name: string;
  placeHolder: string;
  register: UseFormRegisterReturn;
  errorMsg?: string;
  handleChange: (
    id: "email" | "username" | "password" | "passwordConfirm"
  ) => void;
  isCustom?: boolean;
  validateFunc?: () => Promise<void>;
}

const InputRow = ({
  id,
  name,
  placeHolder,
  type,
  register,
  errorMsg,
  handleChange,
  isCustom,
  validateFunc,
}: IInputRow) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{name}</Label>
      {isCustom ? (
        <CustomDiv>
          <Input
            type={type}
            placeholder={placeHolder}
            id={id}
            {...register}
            onChange={() => handleChange(id)}
          />
          <ConfirmButton type="button" onClick={validateFunc}>
            confirm
          </ConfirmButton>
        </CustomDiv>
      ) : (
        <Input
          type={type}
          placeholder={placeHolder}
          id={id}
          {...register}
          onChange={() => handleChange(id)}
        />
      )}
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </Wrapper>
  );
};

export default InputRow;
