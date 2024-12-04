import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IAlbumFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import { albumFields } from "../../../shared/lib/admin/formFields";
import AdminForm from "../../../widgets/admin/AdminForm";

const AdminAlbumsNew: React.FC = () => {
  const { register, handleSubmit, trigger } = useForm<IAlbumFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IAlbumFormInput> = (event) => {
    // 데이터 보내기
    console.log(event);
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
      <AdminForm register={register} fields={albumFields} />
    </AdminFormLayout>
  );
};

export default AdminAlbumsNew;
