import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IArtistFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import AdminForm from "../../../widgets/admin/AdminForm";
import { artistFields } from "../../../shared/lib/admin/formFields";

const AdminArtistsNew: React.FC = () => {
  const { register, handleSubmit, trigger } = useForm<IArtistFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IArtistFormInput> = async (event) => {
    // 데이터 보내기
    console.log(event);

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
    }).then((result) => result.json());

    if (result.ok) {
      navigate("/admin/artists");
    }
  };

  const submitForm = async () => {
    //validate
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    } else {
      console.log("error");
    }
  };

  return (
    <AdminFormLayout backFunc={() => navigate(-1)} submitForm={submitForm}>
      <AdminForm register={register} fields={artistFields} />
    </AdminFormLayout>
  );
};

export default AdminArtistsNew;
