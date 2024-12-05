import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Album } from "../../../shared/models/album";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAlbumFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import { albumFields } from "../../../shared/lib/admin/formFields";
import AdminForm from "../../../widgets/admin/AdminForm";

const AdminAlbumEdit: React.FC = () => {
  const album = useOutletContext<Album | undefined>();
  const [currentAlbum, setCurrentAlbum] = useState<IAlbumFormInput>();

  const { register, setValue, handleSubmit, trigger, getValues } = useForm<
    IAlbumFormInput
  >();

  const defaultValue = {
    title: album?.title,
    introduction: album?.introduction,
    released_at: album?.released_at,
    category: album?.category,
    coverImg: album?.coverImg,
    length: album?.length,
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (album) {
      setCurrentAlbum({
        title: album?.title,
        introduction: album?.introduction,
        released_at: album?.released_at,
        category: album.category,
        coverImg: album.coverImg,
        length: album.length,
      });
    }
  }, [album]);

  const onSubmit: SubmitHandler<IAlbumFormInput> = (event) => {
    if (!currentAlbum) return;

    (Object.keys(event) as (keyof IAlbumFormInput)[]).forEach((key) => {
      if (getValues(key) === "") {
        setValue(key, currentAlbum[key]);
      }
    });

    // // 데이터 보내기
    // const data = getValues();

    console.log(getValues());
  };

  const validateForm = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  // 데이터 주입
  // 초기 데이터
  // 타입
  // register

  return (
    <AdminFormLayout backFunc={() => navigate(-1)} submitForm={validateForm}>
      <AdminForm
        register={register}
        fields={albumFields}
        initialData={defaultValue as IAlbumFormInput}
      />
    </AdminFormLayout>
  );
};

export default AdminAlbumEdit;
