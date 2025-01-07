import React from "react";
import styled from "styled-components";
import { Music } from "../../shared/models/music";
import { Album } from "../../shared/models/album";
import { Artist } from "../../shared/models/artist";

const ModalOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentModal = styled.div`
  width: 50%;
  height: 50%;
  border: 0.5px solid black;
  border-radius: 20px;
  padding: 20px 25px;

  position: relative;

  box-sizing: border-box;

  background-color: #fff;

  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
`;

const ItemContainer = styled.div`
  height: 100%;
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;

  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바 숨김 */
  }
`;

const Item = styled.div`
  width: 100%;
  min-height: 50px;

  display: flex;
  align-items: center;
  gap: 15px;

  padding: 10px 15px;

  box-sizing: border-box;

  border-radius: 15px;

  cursor: pointer;

  background-color: #858585;

  &:hover {
    background-color: #bdbdbd;
  }
`;

const ItemTitle = styled.span``;

const ItemInfo = styled.span``;

interface IAdminModal {
  closeModal: () => void;
  dataList: Music[] | Album[] | Artist[] | string[];
  dataType: "music" | "album" | "artist" | "test";
  modalFunc: (id: string, name?: string) => Promise<void>;
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

const isTestList = (list: unknown[]): list is string[] => {
  return true;
};

const AdminModal = ({
  closeModal,
  dataList,
  dataType,
  modalFunc,
}: IAdminModal) => {
  const handleItemClick = (id: string, name?: string) => {
    if (dataType === "album") {
      modalFunc(id, name);
    } else if (dataType === "artist") {
      modalFunc(id, name);
    } else {
      modalFunc(id, name);
    }
  };

  console.log("list", dataList, dataType);

  return (
    <ModalOverlay onClick={closeModal}>
      <ContentModal
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <ModalHeader>
          <button onClick={closeModal}>X</button>
        </ModalHeader>
        <ItemContainer>
          {dataType === "music" &&
            isMusicList(dataList) &&
            dataList.map((music) => (
              <Item
                key={music._id}
                onClick={() => handleItemClick(music._id, music.title)}
              >
                <ItemTitle>{music.title}</ItemTitle>
                <ItemInfo>{music.released_at}</ItemInfo>
              </Item>
            ))}
          {dataType === "album" &&
            isAlbumList(dataList) &&
            dataList.map((album) => (
              <Item
                key={album._id}
                onClick={() => handleItemClick(album._id, album.title)}
              >
                <ItemTitle>{album.title}</ItemTitle>
                <ItemInfo>
                  {album.musics.length}/{album.length}
                </ItemInfo>
              </Item>
            ))}
          {dataType === "artist" &&
            isArtistList(dataList) &&
            dataList.map((artist) => (
              <Item
                key={artist._id}
                onClick={() => handleItemClick(artist._id, artist.artistname)}
              >
                <ItemTitle>{artist.artistname}</ItemTitle>
                <ItemInfo>{artist.musics.length}</ItemInfo>
              </Item>
            ))}
          {dataType === "test" &&
            isTestList(dataList) &&
            dataList.map((data) => <div>{data}</div>)}
          {/* {Array.from({ length: 50 }).map((_, idx) => (
            <Item key={idx}>Frank</Item>
          ))} */}
        </ItemContainer>
      </ContentModal>
    </ModalOverlay>
  );
};

export default AdminModal;
