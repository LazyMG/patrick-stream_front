import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";
import AdminInput from "./AdminInput";

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

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

interface IAdminInputRowProps<T extends string> {
  id: T;
  name: string;
  placeHolder: string;
  type: string;
  register: UseFormRegisterReturn;
  errorMsg?: string;
  handleChange: (id: T) => void;
}

function AdminInputRow<T extends string>({
  id,
  name,
  placeHolder,
  type,
  register,
  errorMsg,
  handleChange,
}: IAdminInputRowProps<T>) {
  return (
    <Wrapper>
      <Label htmlFor={id}>{name}</Label>
      <AdminInput
        type={type}
        placeholder={placeHolder}
        id={id}
        {...register}
        onChange={() => handleChange(id)}
      />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </Wrapper>
  );
}

export default AdminInputRow;
