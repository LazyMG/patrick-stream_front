import styled from "styled-components";
import { IArtistFormInput } from "../../../shared/types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ArtistIDs } from "../../../shared/models/artist";
import AdminInputRow from "../../../shared/ui/admin/AdminInputRow";

const EditForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface IAdminArtistForm {
  register: UseFormRegister<IArtistFormInput>;
  handleChange: (id: ArtistIDs) => void;
  errors: FieldErrors<IArtistFormInput>;
}

const AdminArtistForm = ({
  register,
  handleChange,
  errors,
}: IAdminArtistForm) => {
  return (
    <EditForm>
      <AdminInputRow
        id="artistname"
        name="Artistname"
        placeHolder="Artistname"
        type="text"
        register={register("artistname", {
          required: "아티스트 명을 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.artistname ? errors.artistname.message : ""}
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
        id="debut_at"
        name="Debut Date"
        placeHolder="YYYY-MM-DD"
        type="text"
        register={register("debut_at", {
          required: "데뷔 일자를 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.debut_at ? errors.debut_at.message : ""}
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
        id="country"
        name="Country"
        placeHolder="Country"
        type="text"
        register={register("country", {
          required: "국가를 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.country ? errors.country.message : ""}
      />
    </EditForm>
  );
};

export default AdminArtistForm;
