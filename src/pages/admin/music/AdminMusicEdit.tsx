import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Music } from "../../../shared/models/music";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMusicFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import AdminForm from "../../../widgets/admin/AdminForm";
import { musicFields } from "../../../shared/lib/admin/formFields";

const AdminMusicEdit: React.FC = () => {
  const music = useOutletContext<Music | undefined>();
  const [currentMusic, setCurrentMusic] = useState<IMusicFormInput>();
  const { register, setValue, handleSubmit, trigger, getValues } = useForm<
    IMusicFormInput
  >();

  const navigate = useNavigate();

  const defaultValue = {
    title: music?.title || "",
    duration: music?.duration || 0,
    ytId: music?.ytId || "",
    released_at: music?.released_at || "",
    genre: music?.genre.toString() || "",
    coverImg: music?.coverImg || "",
  };

  useEffect(() => {
    if (music) {
      setCurrentMusic({
        title: music.title,
        duration: music.duration,
        ytId: music.ytId,
        released_at: music.released_at,
        genre: music.genre.toString(),
        coverImg: music.coverImg,
      });
    }
  }, [music]);

  const onSubmit: SubmitHandler<IMusicFormInput> = (event) => {
    if (!currentMusic) return;

    (Object.keys(event) as (keyof IMusicFormInput)[]).forEach((key) => {
      if (getValues(key) === "") {
        setValue(key, currentMusic[key]);
      }
    });

    // // 데이터 보내기
    // const data = getValues();

    console.log(getValues());
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
        fields={musicFields}
        initialData={defaultValue as IMusicFormInput}
      />
    </AdminFormLayout>
  );
};

export default AdminMusicEdit;
