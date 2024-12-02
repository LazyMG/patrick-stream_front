import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Album } from "../../../shared/models/album";
import styled from "styled-components";
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

  return (
    <ContentContainer>
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
      <ContentHeader>
        <AdminDetailButtons
          firstButtonConfig={{
            modalOpen: openThisAlbumModal,
            buttonText: "음악 삭제하기",
          }}
          secondButtonConfig={{
            modalOpen: openArtistModal,
            buttonText: "아티스트에 등록하기",
          }}
          path={`/albums/${album?.id}`}
          deleteFunc={deleteAblum}
        />
      </ContentHeader>
      <Content>
        <ContentRow>
          <Info>
            <p>제목: {album?.title}</p>
            <p>아티스트: {album?.artists}</p>
            <p>재생시간: {album?.total_duration}</p>
            <p>등록 일자: {album?.created_at.toDateString()}</p>
            <p>발매 일자: {album?.released_at.toDateString()}</p>
            <p>카테고리: {album?.category}</p>
            <p>곡 수: {album?.length}</p>
            <p>현재 곡 수: {album?.musics.length}</p>
          </Info>
          <Image src={album?.coverImg} />
        </ContentRow>
        <ContentRow>
          <Introduction>{album?.introduction}</Introduction>
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

export default AdminDetailAlbum;
