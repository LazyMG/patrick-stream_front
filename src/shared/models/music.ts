import { APIAlbum } from "./album";
import { APIArtist } from "./artist";

export interface APIMusic {
  album: APIAlbum;
  artists: APIArtist[];
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
  index?: number;
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
  | "released_at"
  | "index";
