import { APIArtist } from "./artist";
import { APIMusic } from "./music";
import { APIUser } from "./user";

export interface Album {
  _id: string;
  title: string;
  musics: string[];
  artists: string[];
  introduction: string;
  released_at: string;
  category: string;
  total_duration: number;
  length: number;
  coverImg: string;
  created_at: string;
}

// 수정 필요
export interface APIAlbum {
  artists?: APIArtist[];
  category?: string;
  comments?: string[];
  coverImg: string;
  created_at?: string;
  followers?: APIUser[];
  introduction?: string;
  length?: number;
  musics?: APIMusic[];
  released_at?: string;
  title: string;
  total_duration?: number;
  __v?: number;
  _id: string;
}

export interface IOutletAlbum {
  album: APIAlbum;
  setAlbum: React.Dispatch<React.SetStateAction<APIAlbum | null>>;
}

export interface Test {
  category: string;
  coverImg: string;
  musics: Array<{
    duration: number;
    title: string;
    ytId: string;
    _id: string;
  }>;
  released_at: string;
  title: string;
  _id: string;
}

export type AlbumIDs =
  | "title"
  | "length"
  | "total_duration"
  | "category"
  | "coverImg"
  | "introduction"
  | "released_at";
