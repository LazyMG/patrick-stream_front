import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IOutletArtist } from "../../../shared/models/artist";
import AdminDetailLayout from "../AdminDetailLayout";
import AdminModalProvider from "../../../widgets/admin/AdminModalProvider";
import { APIAlbum } from "../../../shared/models/album";
import { APIMusic } from "../../../shared/models/music";

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
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/artist/${outletArtist?.artist._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.ok) {
        navigate("/admin/artists");
      } else {
        if (!result.error) {
          if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
          else if (result.type === "NO_DATA")
            alert("존재하지 않는 데이터입니다.");
          else if (result.type === "NO_ACCESS") {
            alert("접근 권한이 없습니다.");
            window.location.href = "/";
          }
        } else {
          alert("DB 에러입니다.");
        }
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
  const getThisAritstMusics = async () => {
    if (outletArtist) {
      return outletArtist.artist.musics as APIMusic[];
    } else {
      return [];
    }
  };

  // 자기 앨범 fetch
  const getThisAritstAlbum = async () => {
    if (outletArtist) {
      return outletArtist.artist.albums as APIAlbum[];
    } else {
      return [];
    }
  };

  // 자기 음악 리스트에서 음악 삭제
  const deleteMusicToArtist = async (musicId: string, musicTitle?: string) => {
    if (
      confirm(
        `${outletArtist?.artist.artistname}에서 ${musicTitle}을(를) 삭제하시겠습니까?`
      )
    ) {
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/artist/${outletArtist?.artist._id}/music`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ musicId }),
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.ok) {
        navigate(0);
      } else {
        if (!result.error) {
          if (result.type === "ERROR_ID") {
            alert("잘못된 데이터입니다.");
          } else if (result.type === "NO_DATA") {
            alert("해당 데이터를 찾을 수 없습니다.");
          } else if (result.type === "NO_ACCESS") {
            alert("접근 권한이 없습니다.");
            window.location.href = "/";
          }
        } else {
          alert("DB 에러입니다. 다시 시도해주세요.");
        }
        closeThisArtistMusicModal();
      }
    }
  };

  // 자기 앨범 리스트에서 앨범 삭제
  const deleteAlbumToArtist = async (albumId: string, albumTitle?: string) => {
    if (
      confirm(
        `${outletArtist?.artist.artistname}에서 ${albumTitle}을(를) 삭제하시겠습니까?`
      )
    ) {
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/artist/${outletArtist?.artist._id}/album`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ albumId }),
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.ok) {
        navigate(0);
      } else {
        if (!result.error) {
          if (result.type === "ERROR_ID") {
            alert("잘못된 데이터입니다.");
          } else if (result.type === "NO_DATA") {
            alert("해당 데이터를 찾을 수 없습니다.");
          } else if (result.type === "NO_ACCESS") {
            alert("접근 권한이 없습니다.");
            window.location.href = "/";
          }
        } else {
          alert("DB 에러입니다. 다시 시도해주세요.");
        }
        closeThisArtistMusicModal();
      }
    }
  };

  return (
    <>
      {isThisArtistMusicModalOpen && (
        <AdminModalProvider
          closeModal={closeThisArtistMusicModal}
          dataType="music"
          fetchFunc={getThisAritstMusics}
          modalFunc={deleteMusicToArtist}
        />
      )}
      {isThisArtistAlbumModalOpen && (
        <AdminModalProvider
          closeModal={closeThisArtistAlbumModal}
          dataType="album"
          fetchFunc={getThisAritstAlbum}
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
