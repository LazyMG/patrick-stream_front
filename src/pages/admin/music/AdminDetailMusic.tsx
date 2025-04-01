import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { IOutletMusic } from "../../../shared/models/music";
import AdminDetailLayout from "../AdminDetailLayout";
import AdminModalProvider from "../../../widgets/admin/AdminModalProvider";

const AdminDetailMusic: React.FC = () => {
  const outletMusic = useOutletContext<IOutletMusic | undefined>();
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState<boolean>(false);
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const deleteMusic = async () => {
    if (confirm(`[${outletMusic?.music.title}]을(를) 삭제하시겠습니까?`)) {
      //삭제 로직
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/music/${outletMusic?.music._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.ok) {
        navigate("/admin/musics");
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
          alert("DB 에러입니다. 잠시 후 시도해주세요.");
        }
      }
    } else {
      return;
    }
  };

  const openAlbumModal = () => {
    if (outletMusic?.music?.album && outletMusic?.music?.album.length !== 0) {
      alert("이미 앨범에 포함된 음악입니다.");
      return;
    }
    setIsAlbumModalOpen(true);
  };

  const openArtistModal = () => {
    if (outletMusic?.music.artists.length !== 0) {
      alert("이미 아티스트에 포함된 음악입니다.");
      return;
    }
    setIsArtistModalOpen(true);
  };

  const closeAlbumModal = () => setIsAlbumModalOpen(false);

  const closeArtistModal = () => setIsArtistModalOpen(false);

  // infoData 만드는 함수 필요
  const infoData = [
    `제목: ${outletMusic?.music.title}`,
    `아티스트: ${
      (outletMusic?.music?.artists &&
        outletMusic?.music?.artists[0]?.artistname) ||
      "없음"
    }`,
    `앨범: ${outletMusic?.music.album?.title || "없음"}`,
    `재생시간: ${outletMusic?.music.duration}`,
    `발매 일자: ${outletMusic?.music.released_at}`,
    `등록 일자: ${outletMusic?.music.created_at}`,
    `장르: ${outletMusic?.music.genre}`,
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
    path: `/musics/${outletMusic?.music._id}`,
    deleteFunc: deleteMusic,
  };

  const fetchFilteredAlbums = async () => {
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/album?filterByMusicsLength=true`
    ).then((res) => res.json());
    if (result.ok) return result.albums;
    else {
      alert("DB 에러입니다.");
      return [];
    }
  };

  // 이미 포함된 아티스트 제외
  const fetchArtists = async () => {
    const result = await fetch(
      `${
        import.meta.env.DEV
          ? import.meta.env.VITE_DEV_API_URL
          : import.meta.env.VITE_PROD_API_URL
      }/artist`
    ).then((res) => res.json());
    if (result.ok) {
      return result.allArtists;
    } else {
      alert("DB 에러입니다.");
      return [];
    }
  };

  // 앨범에 음악 추가하는 코드 필요
  const addMusicToAlbum = async (albumId: string, albumTitle?: string) => {
    if (
      confirm(
        `${outletMusic?.music.title}을(를) ${albumTitle}에 추가하시겠습니까?`
      )
    ) {
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/album/${albumId}/music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ musicId: outletMusic?.music._id }),
        }
      ).then((res) => res.json());
      if (result.ok) {
        alert("추가되었습니다.");
        closeAlbumModal();
        navigate("/admin/musics");
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
        closeAlbumModal();
      }
    }
  };

  // 아티스트에 음악 추가하는 코드 필요
  const addMusicToArtist = async (artistId: string, artistname?: string) => {
    if (
      confirm(
        `${outletMusic?.music.title}을(를) ${artistname}에 추가하시겠습니까?`
      )
    ) {
      const result = await fetch(
        `${
          import.meta.env.DEV
            ? import.meta.env.VITE_DEV_API_URL
            : import.meta.env.VITE_PROD_API_URL
        }/artist/${artistId}/music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ musicId: outletMusic?.music._id }),
        }
      ).then((res) => res.json());
      if (result.ok) {
        alert("추가되었습니다.");
        closeArtistModal();
        navigate("/admin/musics");
      } else {
        if (!result.error) {
          if (result.type === "ERROR_ID") alert("잘못된 데이터입니다.");
          else if (result.type === "NO_DATA")
            alert("해당 데이터를 찾을 수 없습니다.");
          else if (result.type === "NO_ACCESS") {
            alert("접근 권한이 없습니다.");
            window.location.href = "/";
          }
        } else {
          alert("DB 에러입니다. 다시 시도해주세요.");
        }
        closeArtistModal();
      }
    }
  };

  return (
    <>
      {isAlbumModalOpen && (
        <AdminModalProvider
          closeModal={closeAlbumModal}
          dataType="album"
          fetchFunc={fetchFilteredAlbums}
          modalFunc={addMusicToAlbum}
        />
      )}
      {isArtistModalOpen && (
        <AdminModalProvider
          closeModal={closeArtistModal}
          dataType="artist"
          fetchFunc={fetchArtists}
          modalFunc={addMusicToArtist}
        />
      )}
      <AdminDetailLayout
        infoData={infoData}
        imageSrc={outletMusic?.music.coverImg || ""}
        buttonsConfig={buttonConfig}
        comments={[<div>Comment</div>, <div>Comment</div>]}
        ytId={outletMusic?.music.ytId || ""}
      />
    </>
  );
};

export default AdminDetailMusic;
