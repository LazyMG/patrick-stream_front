import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IArtistFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import AdminArtistForm from "./AdminArtistForm";
import { ArtistIDs } from "../../../shared/models/artist";

const AdminArtistsNew: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    clearErrors,
  } = useForm<IArtistFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IArtistFormInput> = async (event) => {
    // 데이터 보내기

    const artistData: IArtistFormInput = {
      artistname: event.artistname,
      country: event.country,
      coverImg: event.coverImg,
      debut_at: event.debut_at,
      introduction: event.introduction,
    };

    const result = await fetch(`http://localhost:5000/artist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artistData }),
      credentials: "include",
    }).then((result) => result.json());

    if (result.ok) {
      navigate("/admin/artists");
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
    //validate
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleChange = (id: ArtistIDs) => {
    clearErrors(id);
  };

  return (
    <AdminFormLayout backFunc={() => navigate(-1)} submitForm={submitForm}>
      <AdminArtistForm
        errors={errors}
        handleChange={handleChange}
        register={register}
      />
    </AdminFormLayout>
  );
};

export default AdminArtistsNew;
