import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IMusicFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import AdminForm from "../../../widgets/admin/AdminForm";
import { musicFields } from "../../../shared/lib/admin/formFields";

const AdminMusicsNew: React.FC = () => {
  const { register, handleSubmit, trigger } = useForm<IMusicFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IMusicFormInput> = async (event) => {
    // 데이터 보내기
    console.log(event);

    const musicData: IMusicFormInput = {
      title: event.title,
      duration: event.duration,
      released_at: event.released_at,
      ytId: event.ytId,
      coverImg: event.coverImg,
      genre: event.genre,
    };

    const result = await fetch(`http://localhost:5000/music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicData }),
    }).then((result) => result.json());

    console.log(result);
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
