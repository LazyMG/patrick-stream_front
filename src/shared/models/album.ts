import { APIArtist, Artist } from "./artist";
import { Music } from "./music";
import { User } from "./user";

// comment, followers 추가 필
//id number -> string
// Music[] -> string[]
// Artist[] -> string[]
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
  coverImg?: string;
  created_at?: string;
  followers?: User[];
  introduction?: string;
  length?: number;
  musics?: Music[];
  released_at?: string;
  title: string;
  total_duration?: number;
  __v?: number;
  _id: string;
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
