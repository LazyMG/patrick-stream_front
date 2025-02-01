import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IMusicFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import AdminMusicForm from "./AdminMusicForm";
import { MusicIDs } from "../../../shared/models/music";

const AdminMusicsNew: React.FC = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
    clearErrors,
    setFocus,
  } = useForm<IMusicFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IMusicFormInput> = async (event) => {
    const musicData: IMusicFormInput = {
      title: event.title,
      duration: event.duration,
      released_at: event.released_at,
      ytId: event.ytId,
      coverImg: event.coverImg,
      genre: event.genre,
      index: event.index,
    };

    const result = await fetch(`http://localhost:5000/music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicData }),
      credentials: "include",
    }).then((result) => result.json());

    if (result.ok) {
      navigate("/admin/musics");
    } else {
      if (!result.error) {
        if (result.type === "EXIST_MUSIC") {
          setError("ytId", { message: "이미 존재하는 아이디입니다." });
          setFocus("ytId");
        } else if (result.type === "NO_ACCESS") {
          alert("접근 권한이 없습니다.");
        }
      } else {
        alert("DB 에러입니다. 잠시 후 시도해주세요.");
      }
      // navigate("/admin/musics");
    }
  };

  const submitForm = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const handleChange = (id: MusicIDs) => {
    clearErrors(id);
  };

  return (
    <AdminFormLayout backFunc={() => navigate(-1)} submitForm={submitForm}>
      <AdminMusicForm
        errors={errors}
        handleChange={handleChange}
        register={register}
      />
    </AdminFormLayout>
  );
};

export default AdminMusicsNew;
