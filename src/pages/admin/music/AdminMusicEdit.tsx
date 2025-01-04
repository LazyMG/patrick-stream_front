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
    } else {
      alert("Server Error");
    }
    navigate(`/admin/musics/${outletMusic?.music._id}`);
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
