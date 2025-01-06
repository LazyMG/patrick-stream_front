import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IOutletArtist } from "../../../shared/models/artist";
import AdminDetailLayout from "../AdminDetailLayout";
import AdminModalProvider from "../../../widgets/admin/AdminModalProvider";

const AdminDetailArtist: React.FC = () => {
  const outletArtist = useOutletContext<IOutletArtist | undefined>();
  const [isThisArtistMusicModalOpen, setIsThisArtistMusicModalOpen] = useState<
    boolean
  >(false);
  const [isThisArtistAlbumModalOpen, setIsThisArtistAlbumModalOpen] = useState<
    boolean
  >(false);

  const navigate = useNavigate();

  const deleteArtist = async () => {
    if (
      confirm(`[${outletArtist?.artist.artistname}]을(를) 삭제하시겠습니까?`)
    ) {
      //삭제 로직
      const result = await fetch(
        `http://localhost:5000/artist/${outletArtist?.artist._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.ok) {
        navigate("/admin/artists");
      }
    } else {
      return;
    }
  };

  const openThisArtistMusicModal = () => setIsThisArtistMusicModalOpen(true);

  const openThisArtistAlbumModal = () => setIsThisArtistAlbumModalOpen(true);

  const closeThisArtistMusicModal = () => setIsThisArtistMusicModalOpen(false);

  const closeThisArtistAlbumModal = () => setIsThisArtistAlbumModalOpen(false);

  const infoData = [
    `이름: ${outletArtist?.artist.artistname}`,
    `음악 수: ${outletArtist?.artist.musics?.length || 0}`,
    `앨범 수: ${outletArtist?.artist.albums?.length || 0}`,
    `데뷔 일자: ${outletArtist?.artist.debut_at}`,
    `등록 일자: ${outletArtist?.artist.created_at}`,
    `국가: ${outletArtist?.artist.country}`,
  ];

  const buttonConfig = {
    firstButtonConfig: {
      modalOpen: openThisArtistMusicModal,
      buttonText: "음악 삭제하기",
    },
    secondButtonConfig: {
      modalOpen: openThisArtistAlbumModal,
      buttonText: "앨범 삭제하기",
    },
    path: `/artists/${outletArtist?.artist._id}`,
    deleteFunc: deleteArtist,
  };

  // 자기 음악 fetch
  const fetchThisAritstMusics = async () => {
    const result = await fetch(
      `http://localhost:5000/artist/${outletArtist?.artist._id}/musics`
    ).then((res) => res.json());
    if (result.ok) return result.musics;
    else [];
  };

  // 자기 앨범 fetch
  const fetchThisAritstAlbum = async () => {
    const result = await fetch(
      `http://localhost:5000/artist/${outletArtist?.artist._id}/albums`
    ).then((res) => res.json());
    if (result.ok) return result.albums;
    else [];
  };

  // 자기 음악 리스트에서 음악 삭제
  const deleteMusicToArtist = async (musicId: string) => {
    await fetch(
      `http://localhost:5000/artist/${outletArtist?.artist._id}/music`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ musicId }),
      }
    );
  };

  // 자기 앨범 리스트에서 앨범 삭제
  const deleteAlbumToArtist = async (albumId: string) => {
    await fetch(
      `http://localhost:5000/artist/${outletArtist?.artist._id}/album`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumId }),
      }
    );
  };

  return (
    <>
      {isThisArtistMusicModalOpen && (
        <AdminModalProvider
          closeModal={closeThisArtistMusicModal}
          dataType="music"
          fetchFunc={fetchThisAritstMusics}
          modalFunc={deleteMusicToArtist}
        />
      )}
      {isThisArtistAlbumModalOpen && (
        <AdminModalProvider
          closeModal={closeThisArtistAlbumModal}
          dataType="album"
          fetchFunc={fetchThisAritstAlbum}
          modalFunc={deleteAlbumToArtist}
        />
      )}

      <AdminDetailLayout
        buttonsConfig={buttonConfig}
        infoData={infoData}
        imageSrc={outletArtist?.artist.coverImg || ""}
        comments={[<div>Comment</div>, <div>Comment</div>]}
        introduction={outletArtist?.artist.introduction}
      />
    </>
  );
};

export default AdminDetailArtist;
