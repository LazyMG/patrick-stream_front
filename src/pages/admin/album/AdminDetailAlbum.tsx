import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IOutletAlbum } from "../../../shared/models/album";
import AdminDetailLayout from "../AdminDetailLayout";
import AdminModalProvider from "../../../widgets/admin/AdminModalProvider";
import { APIMusic } from "../../../shared/models/music";

const AdminDetailAlbum: React.FC = () => {
  const outletAlbum = useOutletContext<IOutletAlbum | undefined>();
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);
  const [isThisAlbumModalOpen, setIsThisAlbumModalOpen] = useState<boolean>(
    false
  );

  const navigate = useNavigate();

  const deleteAblum = async () => {
    if (confirm(`[${outletAlbum?.album.title}]을(를) 삭제하시겠습니까?`)) {
      //삭제 로직
      const result = await fetch(
        `http://localhost:5000/album/${outletAlbum?.album._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.ok) {
        navigate("/admin/albums");
      } else {
        if (!result.error) {
          if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
          else if (result.type === "NO_DATA")
            alert("데이터를 찾을 수 없습니다.");
          else if (result.type === "NO_ACCESS") alert("접근 권한이 없습니다.");
        } else {
          alert("DB 에러입니다.");
        }
      }
    } else {
      return;
    }
  };

  const openThisAlbumModal = () => setIsThisAlbumModalOpen(true);

  const openArtistModal = () => {
    if (outletAlbum?.album.artists?.length !== 0) {
      alert("이미 아티스트에 포함된 앨범입니다.");
      return;
    }
    setIsArtistModalOpen(true);
  };

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
    path: `/albums/${outletAlbum?.album._id}`,
    deleteFunc: deleteAblum,
  };

  const infoData = [
    `제목: ${outletAlbum?.album.title}`,
    `아티스트: ${
      (outletAlbum?.album.artists &&
        outletAlbum?.album?.artists[0]?.artistname) ||
      "없음"
    }`,
    `재생시간: ${outletAlbum?.album.total_duration}`,
    `등록 일자: ${outletAlbum?.album.created_at}`,
    `발매 일자: ${outletAlbum?.album.released_at}`,
    `카테고리: ${outletAlbum?.album.category}`,
    `곡 수: ${outletAlbum?.album.length}`,
    `현재 곡 수: ${outletAlbum?.album.musics?.length || 0}`,
  ];

  // 자기 음악 fetch 하는 코드 필요
  const fetchThisAlbumMusics = async () => {
    if (outletAlbum) {
      return outletAlbum.album.musics as APIMusic[];
    } else {
      return [];
    }
  };

  // 아티스트 데이터 fetch 하는 코드 필요
  const fetchArtists = async () => {
    const result = await fetch("http://localhost:5000/artist").then((res) =>
      res.json()
    );
    if (result.ok) {
      return result.allArtists;
    } else {
      alert("DB 에러입니다.");
      return [];
    }
  };

  // 자기 음악 삭제하는 코드 필요
  const deleteMusicToAlbum = async (musicId: string, musicTitle?: string) => {
    if (
      confirm(
        `${outletAlbum?.album.title}에서 ${musicTitle}을(를) 삭제하시겠습니까?`
      )
    ) {
      const result = await fetch(
        `http://localhost:5000/album/${outletAlbum?.album._id}/music`,
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
          if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
          else if (result.type === "NO_DATA")
            alert("존재하지 않는 데이터입니다.");
          else if (result.type === "NO_ACCESS") alert("접근 권한이 없습니다.");
        } else {
          alert("DB 에러입니다.");
        }
        closeThisAlbumModal();
      }
    }
  };

  // 아티스트에 자기 추가하는 코드 필요
  const addAlbumToArtist = async (artistId: string, artistname?: string) => {
    if (
      confirm(
        `${outletAlbum?.album.title}을(를) ${artistname}에 추가하시겠습니까?`
      )
    ) {
      const result = await fetch(
        `http://localhost:5000/artist/${artistId}/album`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ albumId: outletAlbum?.album._id }),
        }
      ).then((res) => res.json());
      if (result.ok) {
        alert("추가되었습니다.");
        closeArtistModal();
        navigate("/admin/albums");
      } else {
        if (!result.error) {
          if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
          else if (result.type === "NO_DATA")
            alert("해당 데이터를 찾을 수 없습니다.");
        } else {
          alert("DB 에러입니다. 다시 시도해주세요.");
        }
        closeArtistModal();
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
        imageSrc={outletAlbum?.album.coverImg || ""}
        comments={[<div>Comment</div>, <div>Comment</div>]}
        introduction={outletAlbum?.album.introduction}
      />
    </>
  );
};

export default AdminDetailAlbum;
