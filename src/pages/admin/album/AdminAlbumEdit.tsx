import { useNavigate, useOutletContext } from "react-router-dom";
import { AlbumIDs, IOutletAlbum } from "../../../shared/models/album";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAlbumFormInput } from "../../../shared/types";
import AdminFormLayout from "../AdminFormLayout";

import AdminAlbumForm from "./AdminAlbumForm";

const AdminAlbumEdit: React.FC = () => {
  const outletAlbum = useOutletContext<IOutletAlbum | undefined>();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    clearErrors,
  } = useForm<IAlbumFormInput>({
    defaultValues: {
      title: outletAlbum?.album.title || "",
      introduction: outletAlbum?.album.introduction || "",
      released_at: outletAlbum?.album.released_at || "",
      category: outletAlbum?.album.category || "",
      coverImg: outletAlbum?.album.coverImg || "",
      length: outletAlbum?.album.length || 0,
    },
  });

  const navigate = useNavigate();

  const handleChange = (id: AlbumIDs) => {
    clearErrors(id);
  };

  const onSubmit: SubmitHandler<IAlbumFormInput> = async (event) => {
    const changedFields: Partial<IAlbumFormInput> = {};

    (Object.keys(event) as (keyof IAlbumFormInput)[]).forEach((key) => {
      const newValue = event[key];
      const oldValue = outletAlbum?.album[key];

      if (key === "length") {
        const numValue =
          typeof newValue === "string" ? Number(newValue) : newValue;
        if (numValue !== oldValue) {
          changedFields.length = numValue;
        }
        return;
      }

      if (newValue !== oldValue) {
        changedFields[key] = newValue as IAlbumFormInput[typeof key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    const result = await fetch(
      `http://localhost:5000/album/${outletAlbum?.album._id}`,
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
      if (outletAlbum) {
        outletAlbum.setAlbum((prev) => {
          if (!prev) return prev;
          const changedAlbum = { ...prev };
          (Object.keys(changedFields) as (keyof IAlbumFormInput)[]).forEach(
            (key) => {
              switch (key) {
                case "length":
                  if (changedFields.length !== undefined) {
                    changedAlbum.length = Number(changedFields.length);
                  }
                  break;

                case "introduction":
                  if (changedFields.introduction !== undefined) {
                    changedAlbum.introduction = changedFields.introduction;
                  }
                  break;

                case "coverImg":
                  if (changedFields.coverImg !== undefined) {
                    changedAlbum.coverImg = changedFields.coverImg;
                  }
                  break;

                case "released_at":
                  if (changedFields.released_at !== undefined) {
                    changedAlbum.released_at = changedFields.released_at;
                  }
                  break;

                case "title":
                  if (changedFields.title !== undefined) {
                    changedAlbum.title = changedFields.title;
                  }
                  break;

                case "category":
                  if (changedFields.category !== undefined) {
                    changedAlbum.category = changedFields.category;
                  }
                  break;
                default:
                  break;
              }
            }
          );
          return changedAlbum;
        });
      }
    } else {
      alert("Server Error");
    }
    navigate(`/admin/albums/${outletAlbum?.album._id}`);
  };

  const validateForm = async () => {
    if (!outletAlbum?.album) return;

    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <AdminFormLayout backFunc={() => navigate(-1)} submitForm={validateForm}>
      <AdminAlbumForm
        errors={errors}
        handleChange={handleChange}
        register={register}
      />
    </AdminFormLayout>
  );
};

export default AdminAlbumEdit;
