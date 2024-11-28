import { Album } from "./album";
import { Music } from "./music";

// comment, followers 추가 필
//id number -> string
// Music[] -> string[]
// Album[] -> string[]

export interface Artist {
  id: string;
  artistname: string;
  musics: string[];
  albums: string[];
  introduction: string;
  debut_at: Date;
  country: string;
  coverImg: string;
  created_at: Date;
}
