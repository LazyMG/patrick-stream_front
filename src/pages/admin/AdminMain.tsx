import React, { useEffect, useState } from "react";
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
  const [musicsCount, setMusicCount] = useState<number>(0);
  const [albumsCount, setAlbumCount] = useState<number>(0);
  const [artistsCount, setArtistsCount] = useState<number>(0);

  const navigate = useNavigate();

  const getMusicCounts = async () => {
    const result = await fetch(
      `http://localhost:5000/music/count`
    ).then((res) => res.json());

    if (result.ok) {
      setMusicCount(result.counts);
    }
  };

  const getAlbumCounts = async () => {
    const result = await fetch(
      `http://localhost:5000/album/count`
    ).then((res) => res.json());

    if (result.ok) {
      setAlbumCount(result.counts);
    }
  };

  const getArtistCounts = async () => {
    const result = await fetch(
      `http://localhost:5000/artist/count`
    ).then((res) => res.json());

    if (result.ok) {
      setArtistsCount(result.counts);
    }
  };

  useEffect(() => {
    getMusicCounts();
    getAlbumCounts();
    getArtistCounts();
  }, []);

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
      <Link to={"/admin/musics"}>
        <Tab>
          <TabContent>Music: {musicsCount}</TabContent>
          <TabContent>
            <button onClick={(event) => gotoUploadPage(event, "/musics/new")}>
              등록하기
            </button>
          </TabContent>
        </Tab>
      </Link>
      <Link to={"/admin/albums"}>
        <Tab>
          <TabContent>Album: {albumsCount}</TabContent>
          <TabContent>
            <button onClick={(event) => gotoUploadPage(event, "/albums/new")}>
              등록하기
            </button>
          </TabContent>
        </Tab>
      </Link>
      <Link to={"/admin/artists"}>
        <Tab>
          <TabContent>Artist: {artistsCount}</TabContent>
          <TabContent>
            <button onClick={(event) => gotoUploadPage(event, "/artists/new")}>
              등록하기
            </button>
          </TabContent>
        </Tab>
      </Link>
    </ContentContainer>
  );
};

export default AdminMain;
