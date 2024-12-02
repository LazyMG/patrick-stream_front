import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { Artist } from "../../../shared/models/artist";
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

const Introduction = styled.p`
  background-color: yellow;
  width: 100%;
  padding: 10px 15px;
  height: 20px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  background-color: blue;
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

  return (
    <ContentContainer>
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
      <ContentHeader>
        <AdminDetailButtons
          firstButtonConfig={{
            modalOpen: openThisArtistMusicModal,
            buttonText: "음악 삭제하기",
          }}
          secondButtonConfig={{
            modalOpen: openThisArtistAlbumModal,
            buttonText: "앨범 삭제하기",
          }}
          path={`/artists/${artist?.id}`}
          deleteFunc={deleteArtist}
        />
      </ContentHeader>
      <Content>
        <ContentRow>
          <Info>
            <p>이름: {artist?.artistname}</p>
            <p>음악 수: {artist?.musics.length}</p>
            <p>앨범 수: {artist?.albums.length}</p>
            <p>데뷔 일자: {artist?.debut_at.toDateString()}</p>
            <p>등록 일자: {artist?.created_at.toDateString()}</p>
            <p>국가: {artist?.country}</p>
          </Info>
          <Image src={artist?.coverImg} />
        </ContentRow>
        <ContentRow>
          <Introduction>{artist?.introduction}</Introduction>
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

export default AdminDetailArtist;
