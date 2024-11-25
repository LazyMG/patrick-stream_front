import React from "react";
import { _getMusics } from "../../shared/lib/testMusicFunc";
import styled from "styled-components";
import { _getArtistInfo } from "../../shared/lib/testArtistFunc";
import { Link, useNavigate } from "react-router-dom";

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

const AdminMusics: React.FC = () => {
  const musics = _getMusics();

  const navigate = useNavigate();

  const gotoPage = (
    event: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    navigate("/admin" + url);
  };
  return (
    <ContentContainer>
      <ContentHeader>
        <button onClick={(event) => gotoPage(event, "/musics/new")}>
          등록하기
        </button>
      </ContentHeader>
      <Content>
        {musics.map((music) => (
          <Link to={`./${music.id}`} key={music.id}>
            <Tab>
              <TabContent>{music.title}</TabContent>
              <TabContent>{_getArtistInfo(music.artists[0])}</TabContent>
            </Tab>
          </Link>
        ))}
      </Content>
    </ContentContainer>
  );
};

export default AdminMusics;
