import styled from "styled-components";
import AdminInputRow from "../../../shared/ui/admin/AdminInputRow";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IMusicFormInput } from "../../../shared/types";
import { MusicIDs } from "../../../shared/models/music";

const EditForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

interface IAdminMusicForm {
  register: UseFormRegister<IMusicFormInput>;
  handleChange: (id: MusicIDs) => void;
  errors: FieldErrors<IMusicFormInput>;
}

const AdminMusicForm = ({
  register,
  handleChange,
  errors,
}: IAdminMusicForm) => {
  return (
    <EditForm>
      <AdminInputRow<MusicIDs>
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
      <AdminInputRow<MusicIDs>
        id="duration"
        name="Duration"
        placeHolder="Duration"
        type="number"
        register={register("duration", {
          required: "재생 시간을 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.duration ? errors.duration.message : ""}
      />
      <AdminInputRow<MusicIDs>
        id="index"
        name="Index"
        placeHolder="Index"
        type="number"
        register={register("index", {
          required: "음악 번호를 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.index ? errors.index.message : ""}
      />
      <AdminInputRow<MusicIDs>
        id="ytId"
        name="Youtube Id"
        placeHolder="Youtube Id"
        type="text"
        register={register("ytId", {
          required: "유튜브 아이디를 입력해주세요.",
          pattern: {
            value: /^[a-zA-Z0-9_-]+$/,
            message: "아이디는 영어와 숫자로 구성해주세요.",
          },
        })}
        handleChange={handleChange}
        errorMsg={errors.ytId ? errors.ytId.message : ""}
      />
      <AdminInputRow<MusicIDs>
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
      <AdminInputRow<MusicIDs>
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
      <AdminInputRow<MusicIDs>
        id="genre"
        name="Genre"
        placeHolder="Genre"
        type="text"
        register={register("genre", {
          required: "장르를 입력해주세요.",
        })}
        handleChange={handleChange}
        errorMsg={errors.genre ? errors.genre.message : ""}
      />
    </EditForm>
  );
};

export default AdminMusicForm;
