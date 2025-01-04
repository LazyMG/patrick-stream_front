import { FieldErrors, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { IAlbumFormInput } from "../../../shared/types";
import AdminInputRow from "../../../shared/ui/admin/AdminInputRow";
import { AlbumIDs } from "../../../shared/models/album";

const EditForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface IAdminAlbumForm {
  register: UseFormRegister<IAlbumFormInput>;
  handleChange: (id: AlbumIDs) => void;
  errors: FieldErrors<IAlbumFormInput>;
}

const AdminAlbumForm = ({
  register,
  handleChange,
  errors,
}: IAdminAlbumForm) => {
  return (
    <EditForm>
      <AdminInputRow
        id="title"
        name="Title"
        placeHolder="Title"
        type="text"
        register={register("title", {
          required: "제목을 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.title ? errors.title.message : ""}
      />
      <AdminInputRow
        id="length"
        name="Length"
        placeHolder="Length"
        type="number"
        register={register("length", {
          required: "길이를 입력해주세요.",
          min: {
            value: 1,
            message: "앨범은 1곡 이상 있어야 합니다.",
          },
        })}
        handleChange={handleChange}
        errorMsg={errors.length ? errors.length.message : ""}
      />
      <AdminInputRow
        id="introduction"
        name="Introduction"
        placeHolder="Introduction"
        type="text"
        register={register("introduction")}
        handleChange={handleChange}
        errorMsg={errors.introduction ? errors.introduction.message : ""}
      />
      <AdminInputRow
        id="released_at"
        name="Released Date"
        placeHolder="YYYY-MM-DD"
        type="text"
        register={register("released_at", {
          required: "발매 일자를 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.released_at ? errors.released_at.message : ""}
      />
      <AdminInputRow
        id="coverImg"
        name="Cover Image"
        placeHolder="Cover Image"
        type="text"
        register={register("coverImg", {
          required: "이미지 주소를 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.coverImg ? errors.coverImg.message : ""}
      />
      <AdminInputRow
        id="category"
        name="Category"
        placeHolder="Category"
        type="text"
        register={register("category", {
          required: "카테고리를 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.category ? errors.category.message : ""}
      />
    </EditForm>
  );
};

export default AdminAlbumForm;
