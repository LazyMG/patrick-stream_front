import { Album } from "./album";
import { Artist } from "./artist";
import { Count } from "./count";

//comment 추가 필요
//id number -> string
//Artist[] -> string[]
//Album -> string
export interface Music {
  _id: string;
  title: string;
  artists: string[];
  album: string;
  duration: number;
  counts: Count;
  ytId: string;
  released_at: string;
  genre: string[];
  coverImg: string;
  created_at: Date;
}

export interface APIMusic {
  album: {
    coverImg: string;
    title: string;
    _id: string;
    category: string;
  };
  artists: Array<{
    artistname: string;
    coverImg: string;
    _id: string;
  }>;
  comments?: string[];
  counts: {
    views: number;
    likes: number;
  };
  coverImg: string;
  created_at: string;
  duration: number;
  genre: string[];
  released_at: string;
  title: string;
  ytId: string;
  __v?: number;
  _id: string;
}

export interface IOutletMusic {
  music: APIMusic;
  setMusic: React.Dispatch<React.SetStateAction<APIMusic | null>>;
}

export type MusicIDs =
  | "title"
  | "duration"
  | "ytId"
  | "coverImg"
  | "genre"
  | "released_at";
