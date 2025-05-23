import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IAlbumFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import AdminAlbumForm from "./AdminAlbumForm";
import { AlbumIDs } from "../../../shared/models/album";

const AdminAlbumsNew: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    clearErrors,
  } = useForm<IAlbumFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IAlbumFormInput> = async (event) => {
    // 데이터 보내기

    const albumData: IAlbumFormInput = {
      title: event.title,
      coverImg: event.coverImg,
      category: event.category,
      introduction: event.introduction,
      length: event.length,
      released_at: event.released_at,
    };

    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/album`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumData }),
        credentials: "include",
      }
    ).then((result) => result.json());

    if (result.ok) {
      navigate("/admin/albums");
    } else {
      if (!result.error) {
        if (result.type === "NO_ACCESS") {
          alert("권한이 없습니다.");
          window.location.href = "/";
        }
      } else {
        alert("DB 에러입니다.");
      }
    }
  };

  const submitForm = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleChange = (id: AlbumIDs) => {
    clearErrors(id);
  };

  return (
    <AdminFormLayout backFunc={() => navigate(-1)} submitForm={submitForm}>
      <AdminAlbumForm
        errors={errors}
        handleChange={handleChange}
        register={register}
      />
    </AdminFormLayout>
  );
};

export default AdminAlbumsNew;
