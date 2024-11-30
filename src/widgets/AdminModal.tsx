import React from "react";
import styled from "styled-components";
import { Music } from "../shared/models/music";
import { Album } from "../shared/models/album";
import { Artist } from "../shared/models/artist";

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
  background-color: red;
`;

interface IAdminModal {
  closeModal: () => void;
  dataList: Music[] | Album[] | Artist[] | string[];
  dataType: "music" | "album" | "artist" | "test";
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

const AdminModal = ({ closeModal, dataList, dataType }: IAdminModal) => {
  return (
    <ModalOverlay onClick={closeModal}>
      <ContentModal
        onClick={(event: React.MouseEvent<HTMLDivElement>) =>
          event.stopPropagation()
        }
      >
        <div>
          <div>
            <button onClick={closeModal}>X</button>
          </div>
          <div>
            {dataType === "music" &&
              isMusicList(dataList) &&
              dataList.map((music) => <div>{music.title}</div>)}
            {dataType === "album" &&
              isAlbumList(dataList) &&
              dataList.map((album) => <div>{album.title}</div>)}
            {dataType === "artist" &&
              isArtistList(dataList) &&
              dataList.map((artist) => <div>{artist.artistname}</div>)}
            {dataType === "test" &&
              isTestList(dataList) &&
              dataList.map((data) => <div>{data}</div>)}
          </div>
        </div>
      </ContentModal>
    </ModalOverlay>
  );
};

export default AdminModal;
