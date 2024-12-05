import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Artist } from "../../../shared/models/artist";
import AdminModal from "../../../widgets/admin/AdminModal";
import AdminDetailLayout from "../AdminDetailLayout";

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

  return (
    <>
      {isThisArtistMusicModalOpen && (
        <AdminModal
          closeModal={closeThisArtistMusicModal}
          dataList={artist!.musics}
          dataType="test"
        />
      )}
      {isThisArtistAlbumModalOpen && (
        <AdminModal
          closeModal={closeThisArtistAlbumModal}
          dataList={artist!.albums}
          dataType="test"
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
