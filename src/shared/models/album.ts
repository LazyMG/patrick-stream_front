import { Artist } from "./artist";
import { Music } from "./music";

// comment, followers 추가 필
//id number -> string
// Music[] -> string[]
// Artist[] -> string[]
export interface Album {
  id: string;
  title: string;
  musics: string[];
  artists: string[];
  introduction: string;
  released_at: Date;
  category: string;
  total_duration: number;
  length: number;
  coverImg: string;
}
