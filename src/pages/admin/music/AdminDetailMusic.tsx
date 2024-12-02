import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Music } from "../../../shared/models/music";
import { _getAlbums } from "../../../shared/lib/testAlbumFunc";
import { _getAritsts } from "../../../shared/lib/testArtistFunc";
import AdminModal from "../../../widgets/admin/AdminModal";
import AdminDetailButtons from "../../../widgets/admin/AdminDetailButtons";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20%;
  gap: 20px;
  position: relative;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  border: 1px solid black;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  background-color: blue;
`;

const YoutubeContainer = styled.iframe`
  width: 100%;
  height: 600px;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: blue;
  padding: 10px 15px;
`;

const Comment = styled.div`
  display: flex;
  height: 50px;
  background-color: white;
  border-radius: 15px;
`;

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

  return (
    <ContentContainer>
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
      <ContentHeader>
        <AdminDetailButtons
          firstButtonConfig={{
            modalOpen: openAlbumModal,
            buttonText: "앨범에 등록하기",
          }}
          secondButtonConfig={{
            modalOpen: openArtistModal,
            buttonText: "아티스트에 등록하기",
          }}
          path={`/musics/${music?.id}`}
          deleteFunc={deleteMusic}
        />
      </ContentHeader>
      <Content>
        <ContentRow>
          <Info>
            <p>제목: {music?.title}</p>
            <p>아티스트: {music?.artists}</p>
            <p>앨범: {music?.album}</p>
            <p>재생시간: {music?.duration}</p>
            <p>유튜브 아이디: {music?.ytId}</p>
            <p>발매 일자: {music?.released_at}</p>
            <p>등록 일자: {music?.created_at.toDateString()}</p>
            <p>장르: {music?.genre}</p>
          </Info>
          <Image src={music?.coverImg} />
        </ContentRow>
        <ContentRow>
          <YoutubeContainer
            src={`https://www.youtube.com/embed/${music?.ytId}`}
          ></YoutubeContainer>
        </ContentRow>
        <ContentRow>
          <CommentContainer>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </CommentContainer>
        </ContentRow>
      </Content>
    </ContentContainer>
  );
};

export default AdminDetailMusic;
