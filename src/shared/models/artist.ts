import { Album, APIAlbum } from "./album";
import { APIMusic, Music } from "./music";

// comment, followers 추가 필
//id number -> string
// Music[] -> string[]
// Album[] -> string[]

export interface Artist {
  _id: string;
  artistname: string;
  musics: string[];
  albums: string[];
  introduction: string;
  debut_at: string;
  country: string;
  coverImg: string;
  created_at: string;
}

export interface APIArtist {
  albums?: APIAlbum[];
  artistname: string;
  comments?: string[];
  country?: string;
  coverImg: string;
  created_at?: string;
  debut_at?: string;
  followers?: string[];
  introduction?: string;
  musics?: APIMusic[];
  __v?: number;
  _id: string;
}
