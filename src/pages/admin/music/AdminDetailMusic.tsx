import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Music } from "../../../shared/models/music";
import { _getAlbums } from "../../../shared/lib/testAlbumFunc";
import { _getAritsts } from "../../../shared/lib/testArtistFunc";
import AdminModal from "../../../widgets/admin/AdminModal";
import AdminDetailLayout from "../AdminDetailLayout";

const AdminDetailMusic: React.FC = () => {
  const music = useOutletContext<Music | undefined>();
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState<boolean>(false);
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);

  const albums = _getAlbums();
  const artists = _getAritsts();

  const navigate = useNavigate();

  const deleteMusic = () => {
    if (confirm(`[${music?.title}]을(를) 삭제하시겠습니까?`)) {
      //삭제 로직
      navigate("/admin/musics");
    } else {
      return;
    }
  };

  const openAlbumModal = () => setIsAlbumModalOpen(true);

  const openArtistModal = () => setIsArtistModalOpen(true);

  const closeAlbumModal = () => setIsAlbumModalOpen(false);

  const closeArtistModal = () => setIsArtistModalOpen(false);

  // 데이터 주입
  // 모달은 밖에서
  // config prop으로
  // 공통 Info -> 세부 항목은 다름
  // 공통 Image
  // 별도 Youtube
  // 공통 Comment

  const infoData = [
    `제목: ${music?.title}`,
    `아티스트: ${music?.artists}`,
    `앨범: ${music?.album}`,
    `재생시간: ${music?.duration}`,
    `발매 일자: ${music?.released_at}`,
    `등록 일자: ${music?.created_at.toDateString()}`,
    `장르: ${music?.genre}`,
  ];

  const buttonConfig = {
    firstButtonConfig: {
      modalOpen: openAlbumModal,
      buttonText: "앨범에 등록하기",
    },
    secondButtonConfig: {
      modalOpen: openArtistModal,
      buttonText: "아티스트에 등록하기",
    },
    path: `/musics/${music?.id}`,
    deleteFunc: deleteMusic,
  };

  return (
    <>
      {isAlbumModalOpen && (
        <AdminModal
          closeModal={closeAlbumModal}
          dataList={albums}
          dataType="album"
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
        infoData={infoData}
        imageSrc={music?.coverImg || ""}
        buttonsConfig={buttonConfig}
        comments={[<div>Comment</div>, <div>Comment</div>]}
        ytId={music?.ytId || ""}
      />
    </>
  );
};

export default AdminDetailMusic;
