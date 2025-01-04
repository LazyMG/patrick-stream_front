import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

const EditForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  width: fit-content;
`;

const Input = styled.input`
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

interface Field<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: string;
  tag: "input" | "textarea";
}

interface IAdminForm<T extends FieldValues> {
  register: UseFormRegister<T>;
  initialData?: T;
  fields: readonly Field<T>[];
}

function AdminForm<T extends FieldValues>({
  register,
  initialData,
  fields,
}: IAdminForm<T>) {
  return (
    <EditForm>
      {fields.map((field) => (
        <InputRow key={field.name}>
          <Label>{field.label}</Label>
          {field.tag === "input" ? (
            <Input
              type={field.type || "text"}
              {...register(field.name)}
              defaultValue={initialData?.[field.name as keyof T]}
            />
          ) : (
            <textarea
              {...register(field.name)}
              defaultValue={initialData?.[field.name as keyof T]}
            />
          )}
        </InputRow>
      ))}
    </EditForm>
  );
}

export default AdminForm;
