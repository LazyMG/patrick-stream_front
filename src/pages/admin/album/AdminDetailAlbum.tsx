import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Album } from "../../../shared/models/album";
import AdminDetailLayout from "../AdminDetailLayout";
import AdminModalProvider from "../../../widgets/admin/AdminModalProvider";

const AdminDetailAlbum: React.FC = () => {
  const album = useOutletContext<Album | undefined>();
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);
  const [isThisAlbumModalOpen, setIsThisAlbumModalOpen] = useState<boolean>(
    false
  );

  const navigate = useNavigate();

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

  // 자기 음악 fetch 하는 코드 필요
  const fetchThisAlbumMusics = async () => {
    const result = await fetch(
      `http://localhost:5000/album/${album?._id}/musics`
    ).then((res) => res.json());
    if (result.ok) return result.musics;
    else return [];
  };

  // 아티스트 데이터 fetch 하는 코드 필요
  const fetchArtists = async () => {
    const result = await fetch("http://localhost:5000/artist").then((res) =>
      res.json()
    );
    if (result.ok) {
      return result.allArtists;
    } else return [];
  };

  // 자기 음악 삭제하는 코드 필요
  const deleteMusicToAlbum = async (musicId: string) => {
    await fetch(`http://localhost:5000/album/${album?._id}/music`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicId }),
    });
  };

  // 아티스트에 자기 추가하는 코드 필요
  const addAlbumToArtist = async (artistId: string, artistname?: string) => {
    if (confirm(`${album?.title}을(를) ${artistname}에 추가하시겠습니까?`)) {
      const result = await fetch(
        `http://localhost:5000/artist/${artistId}/album`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ albumId: album?._id }),
        }
      ).then((res) => res.json());
      if (result.ok) {
        alert("추가되었습니다.");
        closeArtistModal();
        navigate("/admin/albums");
      }
    }
  };

  return (
    <>
      {isThisAlbumModalOpen && (
        <AdminModalProvider
          closeModal={closeThisAlbumModal}
          dataType="music"
          fetchFunc={fetchThisAlbumMusics}
          modalFunc={deleteMusicToAlbum}
        />
      )}
      {isArtistModalOpen && (
        <AdminModalProvider
          closeModal={closeArtistModal}
          dataType="artist"
          fetchFunc={fetchArtists}
          modalFunc={addAlbumToArtist}
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
