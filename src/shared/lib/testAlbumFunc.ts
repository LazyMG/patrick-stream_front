import { albums } from "../testDB";

export const _getAlbums = () => {
  return albums;
};

export const _getAlbumsCount = () => {
  return albums.length;
};

export const _getAlbumInfo = (albumId: string) => {
  return albums.find((album) => album.id === albumId);
};
