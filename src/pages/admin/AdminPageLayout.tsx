import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APIMusic } from "../../shared/models/music";
import { APIAlbum } from "../../shared/models/album";
import { APIArtist } from "../../shared/models/artist";

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
  background-color: ${(props) => props.theme.color.pink};
`;

const TabContent = styled.p`
  font-size: 15px;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: 48px;
  font-weight: bold;

  width: 100%;
  height: 70vh;
`;

const Button = styled.button`
  border: none;
  background-color: black;
  color: white;
  border-radius: 15px;
  padding: 4px 8px;

  cursor: pointer;
`;

interface AdminPageLayoutProps {
  dataType: "music" | "album" | "artist";
  dataList: APIMusic[] | APIAlbum[] | APIArtist[];
  isError?: boolean;
}

const isMusicList = (list: unknown[]): list is APIMusic[] => {
  return list.every(
    (item) => typeof item === "object" && item !== null && "ytId" in item
  );
};

const isAlbumList = (list: unknown[]): list is APIAlbum[] => {
  return list.every(
    (item) => typeof item === "object" && item !== null && "category" in item
  );
};

const isArtistList = (list: unknown[]): list is APIArtist[] => {
  return list.every(
    (item) => typeof item === "object" && item !== null && "artistname" in item
  );
};

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  dataType,
  dataList,
  isError,
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
      {!isError ? (
        <>
          <ContentHeader>
            <Button onClick={(event) => gotoUploadPage(event, dataType)}>
              등록하기
            </Button>
          </ContentHeader>
          <Content>
            {dataType === "music" &&
              isMusicList(dataList) &&
              dataList.map((music) => (
                <Link to={`./${music._id}`} key={music._id}>
                  <Tab>
                    <TabContent>제목: {music?.title}</TabContent>
                    <TabContent>
                      가수:{" "}
                      {(music.artists && music.artists[0]?.artistname) ||
                        "없음"}
                    </TabContent>
                    <TabContent>
                      앨범: {music?.album?.title || "없음"}
                    </TabContent>
                  </Tab>
                </Link>
              ))}
            {dataType === "album" &&
              isAlbumList(dataList) &&
              dataList.map((album) => (
                <Link to={`./${album._id}`} key={album._id}>
                  <Tab>
                    <TabContent>제목: {album.title}</TabContent>
                    <TabContent>
                      가수:
                      {(album.artists && album.artists[0]?.artistname) ||
                        "없음"}
                    </TabContent>
                    <TabContent>총 곡 수: {album.length}</TabContent>
                    <TabContent>현재 곡 수: {album.musics?.length}</TabContent>
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
                    <TabContent>앨범 수:{artist.albums?.length}</TabContent>
                    <TabContent>음악 수:{artist.musics?.length}</TabContent>
                    <TabContent>등록 일자:{artist.created_at}</TabContent>
                  </Tab>
                </Link>
              ))}
          </Content>{" "}
        </>
      ) : (
        <Error>에러가 발생했습니다.</Error>
      )}
    </ContentContainer>
  );
};

export default AdminPageLayout;
