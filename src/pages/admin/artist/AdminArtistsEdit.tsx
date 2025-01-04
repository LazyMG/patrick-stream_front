import { useNavigate, useOutletContext } from "react-router-dom";
import { ArtistIDs, IOutletArtist } from "../../../shared/models/artist";
import { IArtistFormInput } from "../../../shared/types";
import { SubmitHandler, useForm } from "react-hook-form";
import AdminFormLayout from "../AdminFormLayout";
import AdminArtistForm from "./AdminArtistForm";

const AdminArtistsEdit: React.FC = () => {
  const outletAritst = useOutletContext<IOutletArtist | undefined>();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    clearErrors,
  } = useForm<IArtistFormInput>({
    defaultValues: {
      artistname: outletAritst?.artist.artistname || "",
      introduction: outletAritst?.artist.introduction || "",
      debut_at: outletAritst?.artist.debut_at || "",
      country: outletAritst?.artist.country || "",
      coverImg: outletAritst?.artist.coverImg || "",
    },
  });

  const navigate = useNavigate();

  const handleChange = (id: ArtistIDs) => {
    clearErrors(id);
  };

  const onSubmit: SubmitHandler<IArtistFormInput> = async (event) => {
    const changedFields: Partial<IArtistFormInput> = {};

    (Object.keys(event) as (keyof IArtistFormInput)[]).forEach((key) => {
      const newValue = event[key];
      const oldValue = outletAritst?.artist[key];

      if (newValue !== oldValue) {
        changedFields[key] = newValue as IArtistFormInput[typeof key];
      }
    });

    if (Object.keys(changedFields).length === 0) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    const result = await fetch(
      `http://localhost:5000/artist/${outletAritst?.artist._id}`,
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
      if (outletAritst) {
        outletAritst.setArtist((prev) => {
          if (!prev) return prev;
          const changedArtist = { ...prev };
          (Object.keys(changedFields) as (keyof IArtistFormInput)[]).forEach(
            (key) => {
              switch (key) {
                case "introduction":
                  if (changedFields.introduction !== undefined) {
                    changedArtist.introduction = changedFields.introduction;
                  }
                  break;

                case "coverImg":
                  if (changedFields.coverImg !== undefined) {
                    changedArtist.coverImg = changedFields.coverImg;
                  }
                  break;

                case "debut_at":
                  if (changedFields.debut_at !== undefined) {
                    changedArtist.debut_at = changedFields.debut_at;
                  }
                  break;

                case "artistname":
                  if (changedFields.artistname !== undefined) {
                    changedArtist.artistname = changedFields.artistname;
                  }
                  break;

                case "country":
                  if (changedFields.country !== undefined) {
                    changedArtist.country = changedFields.country;
                  }
                  break;
                default:
                  break;
              }
            }
          );
          return changedArtist;
        });
      }
    } else {
      alert("Server Error");
    }
    navigate(`/admin/artists/${outletAritst?.artist._id}`);
  };

  const submitForm = async () => {
    if (!outletAritst?.artist) return;

    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <AdminFormLayout backFunc={() => navigate(-1)} submitForm={submitForm}>
      <AdminArtistForm
        errors={errors}
        handleChange={handleChange}
        register={register}
      />
    </AdminFormLayout>
  );
};

export default AdminArtistsEdit;
