import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Album } from "../../../shared/models/album";
import { _getAritsts } from "../../../shared/lib/testArtistFunc";
import AdminModal from "../../../widgets/admin/AdminModal";
import AdminDetailLayout from "../AdminDetailLayout";

const AdminDetailAlbum: React.FC = () => {
  const album = useOutletContext<Album | undefined>();
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);
  const [isThisAlbumModalOpen, setIsThisAlbumModalOpen] = useState<boolean>(
    false
  );

  const navigate = useNavigate();

  const artists = _getAritsts();

  const deleteAblum = () => {
    if (confirm(`[${album?.title}]을(를) 삭제하시겠습니까?`)) {
      //삭제 로직
      navigate("/admin/albums");
    } else {
      return;
    }
  };

  const openThisAlbumModal = () => setIsThisAlbumModalOpen(true);

  const openArtistModal = () => setIsArtistModalOpen(true);

  const closeThisAlbumModal = () => setIsThisAlbumModalOpen(false);

  const closeArtistModal = () => setIsArtistModalOpen(false);

  const buttonConfig = {
    firstButtonConfig: {
      modalOpen: openThisAlbumModal,
      buttonText: "음악 삭제하기",
    },
    secondButtonConfig: {
      modalOpen: openArtistModal,
      buttonText: "아티스트에 등록하기",
    },
    path: `/albums/${album?._id}`,
    deleteFunc: deleteAblum,
  };

  const infoData = [
    `제목: ${album?.title}`,
    `아티스트: ${album?.artists}`,
    `재생시간: ${album?.total_duration}`,
    `등록 일자: ${album?.created_at}`,
    `발매 일자: ${album?.released_at}`,
    `카테고리: ${album?.category}`,
    `곡 수: ${album?.length}`,
    `현재 곡 수: ${album?.musics.length}`,
  ];

  return (
    <>
      {isThisAlbumModalOpen && (
        <AdminModal
          closeModal={closeThisAlbumModal}
          dataList={album!.musics}
          dataType="test"
        />
      )}
      {isArtistModalOpen && (
        <AdminModal
          closeModal={closeArtistModal}
          dataList={artists}
          dataType="artist"
        />
      )}
      <AdminDetailLayout
        buttonsConfig={buttonConfig}
        infoData={infoData}
        imageSrc={album?.coverImg || ""}
        comments={[<div>Comment</div>, <div>Comment</div>]}
        introduction={album?.introduction}
      />
    </>
  );
};

export default AdminDetailAlbum;
