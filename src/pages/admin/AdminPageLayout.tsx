import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Music } from "../../shared/models/music";
import { Album } from "../../shared/models/album";
import { Artist } from "../../shared/models/artist";
import { _getArtistName } from "../../shared/lib/testArtistFunc";

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

const isMusicList = (list: any[]): list is Music[] => {
  return list.every((item) => "ytId" in item);
};

const isAlbumList = (list: any[]): list is Album[] => {
  return list.every((item) => "category" in item);
};

const isArtistList = (list: any[]): list is Artist[] => {
  return list.every((item) => "artistname" in item);
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
            <Link to={`./${music.id}`} key={music.id}>
              <Tab>
                <TabContent>{music.title}</TabContent>
                <TabContent>{_getArtistName(music.artists[0])}</TabContent>
              </Tab>
            </Link>
          ))}
        {dataType === "album" &&
          isAlbumList(dataList) &&
          dataList.map((album) => (
            <Link to={`./${album.id}`} key={album.id}>
              <Tab>
                <TabContent>{album.title}</TabContent>
                <TabContent>{album.artists.toString()}</TabContent>
                <TabContent>{album.length}</TabContent>
                <TabContent>{album.musics.length}</TabContent>
                <TabContent>{album.created_at.toDateString()}</TabContent>
              </Tab>
            </Link>
          ))}
        {dataType === "artist" &&
          isArtistList(dataList) &&
          dataList.map((artist) => (
            <Link to={`./${artist.id}`} key={artist.id}>
              <Tab>
                <TabContent>{artist.artistname}</TabContent>
                <TabContent>{artist.albums.length}</TabContent>
                <TabContent>{artist.musics.length}</TabContent>
                <TabContent>{artist.created_at.toDateString()}</TabContent>
              </Tab>
            </Link>
          ))}
      </Content>
    </ContentContainer>
  );
};

export default AdminPageLayout;
