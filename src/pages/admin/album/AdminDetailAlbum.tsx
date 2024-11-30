import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Album } from "../../../shared/models/album";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20%;
  gap: 20px;
  position: relative;
`;

// const ModalOverlay = styled.div`
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 1;
//   top: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const AlbumModal = styled.div`
//   width: 50%;
//   height: 50%;
//   background-color: red;
// `;

// const ArtistModal = styled.div`
//   width: 50%;
//   height: 50%;
//   background-color: blue;
// `;

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

  const navigate = useNavigate();

  const gotoPage = (
    event: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    navigate("/admin" + url);
  };

  const deleteAblum = () => {
    if (confirm(`[${album?.title}]을(를) 삭제하시겠습니까?`)) {
      //삭제 로직
      navigate("/admin/albums");
    } else {
      return;
    }
  };

  return (
    <ContentContainer>
      <ContentHeader>
        <button>앨범에서 음악 삭제</button>
        <button>아티스트에 등록하기</button>
        <button
          onClick={(event) => gotoPage(event, `/albums/${album?.id}/settings`)}
        >
          수정하기
        </button>
        <button onClick={deleteAblum}>삭제하기</button>
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
