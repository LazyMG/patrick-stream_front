import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
`;

interface IUploadForm<T extends FieldValues> {
  register: UseFormRegister<T>;
  fields: ReadonlyArray<{
    name: keyof T;
    label: string;
    type: string;
    tag: string;
  }>;
}

const AdminUploadForm = <T extends FieldValues>({
  register,
  fields,
}: IUploadForm<T>) => {
  return (
    <EditForm>
      {fields.map((field) =>
        field.tag === "input" ? (
          <InputRow key={String(field.name)}>
            <label>{field.label}: </label>
            <input type={field.type} {...register(field.name as Path<T>)} />
          </InputRow>
        ) : (
          <InputRow key={String(field.name)}>
            <label>{field.label}: </label>
            <textarea {...register(field.name as Path<T>)} />
          </InputRow>
        )
      )}
    </EditForm>
  );
};

export default AdminUploadForm;
