import React from "react";
import { _getMusicsCount } from "../../shared/lib/testMusicFunc";
import { _getAlbumsCount } from "../../shared/lib/testAlbumFunc";
import { _getArtistsCount } from "../../shared/lib/testArtistFunc";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const ContentContainer = styled.div`
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
  justify-content: space-between;
`;

const TabContent = styled.p`
  font-size: 15px;
`;

const AdminMain: React.FC = () => {
  const musicsCount = _getMusicsCount();
  const albumsCount = _getAlbumsCount();
  const artistsCount = _getArtistsCount();

  const navigate = useNavigate();

  const gotoUploadPage = (
    event: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    navigate("/admin" + url);
  };
  return (
    <ContentContainer>
      <Link to={"/"}>
        <Tab>
          <TabContent>Music: {musicsCount}</TabContent>
          <TabContent>
            <button onClick={(event) => gotoUploadPage(event, "/musics/new")}>
              등록하기
            </button>
          </TabContent>
        </Tab>
      </Link>
      <Tab>Album: {albumsCount}</Tab>
      <Tab>Artist: {artistsCount}</Tab>
    </ContentContainer>
  );
};

export default AdminMain;
