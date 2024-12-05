import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Music } from "../../shared/models/music";
import { Album } from "../../shared/models/album";
import { Artist } from "../../shared/models/artist";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  a {
    text-decoration: none;
    color: #000;
  }
`;

const Tab = styled.div`
  display: flex;
  padding: 0 20px;
  gap: 20px;
  align-items: center;
  height: 50px;
  border-radius: 15px;
  background-color: beige;
`;

const TabContent = styled.p`
  font-size: 15px;
`;

interface AdminPageLayoutProps {
  dataType: "music" | "album" | "artist";
  dataList: Music[] | Album[] | Artist[];
}

const isMusicList = (list: unknown[]): list is Music[] => {
  return list.every(
    (item) => typeof item === "object" && item !== null && "ytId" in item
  );
};

const isAlbumList = (list: unknown[]): list is Album[] => {
  return list.every(
    (item) => typeof item === "object" && item !== null && "category" in item
  );
};

const isArtistList = (list: unknown[]): list is Artist[] => {
  return list.every(
    (item) => typeof item === "object" && item !== null && "artistname" in item
  );
};

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  dataType,
  dataList,
}) => {
  const navigate = useNavigate();

  const gotoUploadPage = (
    event: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    navigate("/admin/" + url + "s/new");
  };

  return (
    <ContentContainer>
      <ContentHeader>
        <button onClick={(event) => gotoUploadPage(event, dataType)}>
          등록하기
        </button>
      </ContentHeader>
      <Content>
        {dataType === "music" &&
          isMusicList(dataList) &&
          dataList.map((music) => (
            <Link to={`./${music._id}`} key={music._id}>
              <Tab>
                <TabContent>제목: {music.title}</TabContent>
                <TabContent>가수: {music.artists[0] || "없음"}</TabContent>
              </Tab>
            </Link>
          ))}
        {dataType === "album" &&
          isAlbumList(dataList) &&
          dataList.map((album) => (
            <Link to={`./${album._id}`} key={album._id}>
              <Tab>
                <TabContent>제목: {album.title}</TabContent>
                <TabContent>{album.artists.toString()}</TabContent>
                <TabContent>총 곡 수: {album.length}</TabContent>
                <TabContent>현재 곡 수: {album.musics.length}</TabContent>
                <TabContent>{album.created_at}</TabContent>
              </Tab>
            </Link>
          ))}
        {dataType === "artist" &&
          isArtistList(dataList) &&
          dataList.map((artist) => (
            <Link to={`./${artist._id}`} key={artist._id}>
              <Tab>
                <TabContent>이름: {artist.artistname}</TabContent>
                <TabContent>앨범 수:{artist.albums.length}</TabContent>
                <TabContent>음악 수:{artist.musics.length}</TabContent>
                <TabContent>등록 일자:{artist.created_at}</TabContent>
              </Tab>
            </Link>
          ))}
      </Content>
    </ContentContainer>
  );
};

export default AdminPageLayout;
