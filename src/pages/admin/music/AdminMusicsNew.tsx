import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IMusicFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import AdminForm from "../../../widgets/admin/AdminForm";
import { musicFields } from "../../../shared/lib/admin/formFields";

const AdminMusicsNew: React.FC = () => {
  const { register, handleSubmit, trigger } = useForm<IMusicFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IMusicFormInput> = (event) => {
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
      <AdminForm fields={musicFields} register={register} />
    </AdminFormLayout>
  );
};

export default AdminMusicsNew;
