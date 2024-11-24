import React from "react";
import { _getMusics } from "../../shared/lib/testMusicFunc";
import styled from "styled-components";
import { _getArtistInfo } from "../../shared/lib/testArtistFunc";
import { Link } from "react-router-dom";

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
`;

const TabContent = styled.p`
  font-size: 15px;
`;

const AdminMusics: React.FC = () => {
  const musics = _getMusics();
  return (
    <ContentContainer>
      {musics.map((music) => (
        <Link to={`./${music.id}`}>
          <Tab>
            <TabContent>{music.title}</TabContent>
            <TabContent>{_getArtistInfo(music.artists[0])}</TabContent>
          </Tab>
        </Link>
      ))}
    </ContentContainer>
  );
};

export default AdminMusics;
