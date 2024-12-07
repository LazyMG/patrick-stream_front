import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Music } from "../../../shared/models/music";
import AdminDetailLayout from "../AdminDetailLayout";
import AdminModalProvider from "../../../widgets/admin/AdminModalProvider";

const AdminDetailMusic: React.FC = () => {
  const music = useOutletContext<Music | undefined>();
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState<boolean>(false);
  const [isArtistModalOpen, setIsArtistModalOpen] = useState<boolean>(false);

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

  // infoData 만드는 함수 필요
  const infoData = [
    `제목: ${music?.title}`,
    `아티스트: ${music?.artists ?? music?.artists.length ?? "없음"}`,
    `앨범: ${music?.album || "없음"}`,
    `재생시간: ${music?.duration}`,
    `발매 일자: ${music?.released_at}`,
    `등록 일자: ${music?.created_at}`,
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
    path: `/musics/${music?._id}`,
    deleteFunc: deleteMusic,
  };

  const fetchAlbums = async () => {
    const result = await fetch("http://localhost:5000/album").then((res) =>
      res.json()
    );
    if (result.ok) return result.allAlbums;
    else return [];
  };

  const fetchArtists = async () => {
    const result = await fetch("http://localhost:5000/artist").then((res) =>
      res.json()
    );
    if (result.ok) {
      return result.allArtists;
    } else return [];
  };

  // 앨범에 음악 추가하는 코드 필요
  const addMusicToAlbum = async (albumId: string) => {
    const result = await fetch(`http://localhost:5000/album/${albumId}/music`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ musicId: music?._id }),
    });
    console.log(result);
  };

  // 아티스트에 음악 추가하는 코드 필요
  const addMusicToArtist = async (artistId: string) => {
    const result = await fetch(
      `http://localhost:5000/artist/${artistId}/music`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ musicId: music?._id }),
      }
    );
    console.log(result);
  };

  return (
    <>
      {isAlbumModalOpen && (
        <AdminModalProvider
          closeModal={closeAlbumModal}
          dataType="album"
          fetchFunc={fetchAlbums}
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
        imageSrc={music?.coverImg || ""}
        buttonsConfig={buttonConfig}
        comments={[<div>Comment</div>, <div>Comment</div>]}
        ytId={music?.ytId || ""}
      />
    </>
  );
};

export default AdminDetailMusic;
