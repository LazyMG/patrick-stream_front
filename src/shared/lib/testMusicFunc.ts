import { musics } from "../testDB";

export const _getMusics = () => {
  return musics;
};

export const _getMusicsCount = () => {
  return musics.length;
};

export const _getMusicInfo = (musicId: string) => {
  return musics.find((music) => music.id === musicId);
};
