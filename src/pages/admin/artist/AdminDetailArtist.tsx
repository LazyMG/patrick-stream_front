import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Artist } from "../../../shared/models/artist";
import AdminDetailLayout from "../AdminDetailLayout";
import AdminModalProvider from "../../../widgets/admin/AdminModalProvider";

const AdminDetailArtist: React.FC = () => {
  const artist = useOutletContext<Artist | undefined>();
  const [isThisArtistMusicModalOpen, setIsThisArtistMusicModalOpen] = useState<
    boolean
  >(false);
  const [isThisArtistAlbumModalOpen, setIsThisArtistAlbumModalOpen] = useState<
    boolean
  >(false);

  const navigate = useNavigate();

  const deleteArtist = () => {
    if (confirm(`[${artist?.artistname}]을(를) 삭제하시겠습니까?`)) {
      //삭제 로직
      navigate("/admin/artists");
    } else {
      return;
    }
  };

  const openThisArtistMusicModal = () => setIsThisArtistMusicModalOpen(true);

  const openThisArtistAlbumModal = () => setIsThisArtistAlbumModalOpen(true);

  const closeThisArtistMusicModal = () => setIsThisArtistMusicModalOpen(false);

  const closeThisArtistAlbumModal = () => setIsThisArtistAlbumModalOpen(false);

  const infoData = [
    `이름: ${artist?.artistname}`,
    `음악 수: ${artist?.musics.length}`,
    `앨범 수: ${artist?.albums.length}`,
    `데뷔 일자: ${artist?.debut_at}`,
    `등록 일자: ${artist?.created_at}`,
    `국가: ${artist?.country}`,
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
    path: `/artists/${artist?._id}`,
    deleteFunc: deleteArtist,
  };

  // 자기 음악 fetch
  const fetchThisAritstMusics = async () => {
    const result = await fetch(
      `http://localhost:5000/artist/${artist?._id}/musics`
    ).then((res) => res.json());
    if (result.ok) return result.musics;
    else [];
  };

  // 자기 앨범 fetch
  const fetchThisAritstAlbum = async () => {
    const result = await fetch(
      `http://localhost:5000/artist/${artist?._id}/albums`
    ).then((res) => res.json());
    if (result.ok) return result.albums;
    else [];
  };

  // 자기 음악 리스트에서 음악 삭제
  const deleteMusicToArtist = async (musicId: string) => {
    await fetch(`http://localhost:5000/artist/${artist?._id}/music`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicId }),
    });
  };

  // 자기 앨범 리스트에서 앨범 삭제
  const deleteAlbumToArtist = async (albumId: string) => {
    await fetch(`http://localhost:5000/artist/${artist?._id}/album`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ albumId }),
    });
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
        imageSrc={artist?.coverImg || ""}
        comments={[<div>Comment</div>, <div>Comment</div>]}
        introduction={artist?.introduction}
      />
    </>
  );
};

export default AdminDetailArtist;
