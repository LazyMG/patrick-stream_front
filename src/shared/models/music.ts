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
