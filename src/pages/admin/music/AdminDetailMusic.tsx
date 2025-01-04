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

  const deleteMusic = () => {
    if (confirm(`[${outletMusic?.music.title}]을(를) 삭제하시겠습니까?`)) {
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

  // infoData 만드는 함수 필요
  const infoData = [
    `제목: ${outletMusic?.music.title}`,
    `아티스트: ${
      outletMusic?.music.artists ?? outletMusic?.music.artists.length ?? "없음"
    }`,
    `앨범: ${outletMusic?.music.album || "없음"}`,
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
      "http://localhost:5000/album?filterByMusicsLength=true"
    ).then((res) => res.json());
    if (result.ok) return result.albums;
    else return [];
  };

  // 이미 포함된 아티스트 제외
  const fetchArtists = async () => {
    const result = await fetch("http://localhost:5000/artist").then((res) =>
      res.json()
    );
    if (result.ok) {
      return result.allArtists;
    } else return [];
  };

  // 앨범에 음악 추가하는 코드 필요
  const addMusicToAlbum = async (albumId: string, albumTitle?: string) => {
    if (
      confirm(
        `${outletMusic?.music.title}을(를) ${albumTitle}에 추가하시겠습니까?`
      )
    ) {
      const result = await fetch(
        `http://localhost:5000/album/${albumId}/music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ musicId: outletMusic?.music._id }),
        }
      ).then((res) => res.json());
      if (result.ok) {
        alert("추가되었습니다.");
        closeAlbumModal();
        navigate("/admin/musics");
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
        `http://localhost:5000/artist/${artistId}/music`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ musicId: outletMusic?.music._id }),
        }
      ).then((res) => res.json());
      if (result.ok) {
        alert("추가되었습니다.");
        closeArtistModal();
        navigate("/admin/musics");
      } else {
        console.log(result);
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
