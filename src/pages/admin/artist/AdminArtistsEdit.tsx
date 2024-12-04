import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Artist } from "../../../shared/models/artist";
import { IArtistFormInput } from "../../../shared/types";
import { SubmitHandler, useForm } from "react-hook-form";
import AdminFormLayout from "../AdminFormLayout";
import AdminForm from "../../../widgets/admin/AdminForm";
import { artistFields } from "../../../shared/lib/admin/formFields";

const AdminArtistsEdit: React.FC = () => {
  const artist = useOutletContext<Artist | undefined>();
  const [currentArtist, setCurrentArtist] = useState<IArtistFormInput>();
  const { register, setValue, handleSubmit, trigger, getValues } = useForm<
    IArtistFormInput
  >();

  const defaultValue = {
    artistname: artist?.artistname || "",
    introduction: artist?.introduction || "",
    debut_at: artist?.debut_at.toDateString() || "",
    country: artist?.country || "",
    coverImg: artist?.coverImg || "",
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (artist) {
      setCurrentArtist({
        artistname: artist?.artistname,
        introduction: artist?.introduction,
        debut_at: artist?.debut_at.toDateString(),
        country: artist?.country,
        coverImg: artist?.coverImg,
      });
    }
  }, [artist]);

  const onSubmit: SubmitHandler<IArtistFormInput> = (event) => {
    if (!currentArtist) return;

    (Object.keys(event) as (keyof IArtistFormInput)[]).forEach((key) => {
      if (getValues(key) === "") {
        setValue(key, currentArtist[key]);
      }
    });

    // // 데이터 보내기
    // const data = getValues();
  };

  const submitForm = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <AdminFormLayout backFunc={() => navigate(-1)} submitForm={submitForm}>
      <AdminForm
        register={register}
        fields={artistFields}
        initialData={defaultValue as IArtistFormInput}
      />
    </AdminFormLayout>
  );
};

export default AdminArtistsEdit;
