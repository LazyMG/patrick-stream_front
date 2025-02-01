import { useNavigate, useOutletContext } from "react-router-dom";
import { IOutletMusic, MusicIDs } from "../../../shared/models/music";
import { SubmitHandler, useForm } from "react-hook-form";
import { IMusicFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";
import AdminMusicForm from "./AdminMusicForm";

const AdminMusicEdit: React.FC = () => {
  const outletMusic = useOutletContext<IOutletMusic | undefined>();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    clearErrors,
  } = useForm<IMusicFormInput>({
    defaultValues: {
      title: outletMusic?.music.title || "",
      duration: outletMusic?.music.duration || 0,
      ytId: outletMusic?.music.ytId || "",
      released_at: outletMusic?.music.released_at || "",
      genre: outletMusic?.music.genre.toString() || "",
      coverImg: outletMusic?.music.coverImg || "",
      index: outletMusic?.music.index || 0,
    },
  });

  const navigate = useNavigate();

  const handleChange = (id: MusicIDs) => {
    clearErrors(id);
  };

  const onSubmit: SubmitHandler<IMusicFormInput> = async (event) => {
    if (!outletMusic?.music) return;

    const changedFields: Partial<IMusicFormInput> = {};

    (Object.keys(event) as (keyof IMusicFormInput)[]).forEach((key) => {
      const newValue = event[key];
      const oldValue = outletMusic?.music[key];

      if (key === "duration") {
        const numValue =
          typeof newValue === "string" ? Number(newValue) : newValue;
        if (numValue !== oldValue) {
          changedFields.duration = numValue;
        }
        return;
      } else if (key === "index") {
        const numValue =
          typeof newValue === "string" ? Number(newValue) : newValue;
        if (numValue !== oldValue) {
          changedFields.index = numValue;
        }
        return;
      } else if (key === "genre" && Array.isArray(oldValue)) {
        const genreValue = outletMusic?.music[key].join(",");
        if (newValue !== genreValue) {
          changedFields.genre = newValue.toString();
        }
        return;
      }

      if (newValue !== oldValue) {
        changedFields[key] = newValue as IMusicFormInput[typeof key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    const result = await fetch(
      `http://localhost:5000/music/${outletMusic?.music._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ changedFields }),
        credentials: "include",
      }
    ).then((res) => res.json());

    if (result.ok) {
      if (outletMusic) {
        outletMusic.setMusic((prev) => {
          if (!prev) return prev;
          const changedMusic = { ...prev };
          (Object.keys(changedFields) as (keyof IMusicFormInput)[]).forEach(
            (key) => {
              switch (key) {
                case "duration":
                  if (changedFields.duration !== undefined) {
                    changedMusic.duration = Number(changedFields.duration);
                  }
                  break;

                case "genre":
                  if (changedFields.genre !== undefined) {
                    changedMusic.genre = changedFields.genre.split(",");
                  }
                  break;

                case "coverImg":
                  if (changedFields.coverImg !== undefined) {
                    changedMusic.coverImg = changedFields.coverImg;
                  }
                  break;

                case "released_at":
                  if (changedFields.released_at !== undefined) {
                    changedMusic.released_at = changedFields.released_at;
                  }
                  break;

                case "title":
                  if (changedFields.title !== undefined) {
                    changedMusic.title = changedFields.title;
                  }
                  break;

                case "ytId":
                  if (changedFields.ytId !== undefined) {
                    changedMusic.ytId = changedFields.ytId;
                  }
                  break;

                default:
                  break;
              }
            }
          );
          return changedMusic;
        });
      }
      navigate(`/admin/musics/${outletMusic?.music._id}`);
    } else {
      if (!result.error) {
        if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
        else if (result.type === "NO_DATA") alert("데이터를 찾을 수 없습니다.");
        else if (result.type === "NO_ACCESS") alert("접근 권한이 없습니다.");
      } else {
        alert("DB 에러입니다.");
      }
    }
  };

  const submitForm = async () => {
    if (!outletMusic?.music) {
      return;
    }
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
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

export default AdminMusicEdit;
