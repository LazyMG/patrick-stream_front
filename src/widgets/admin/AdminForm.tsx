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
          <label>{field.label}:</label>
          {field.tag === "input" ? (
            <input
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
