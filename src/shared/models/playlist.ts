import { APIMusic } from "./music";
import { APIUser } from "./user";

export interface APIUserPlaylist {
  id: string;
  title: string;
  duration: number;
  introduction: string;
  followersCount: number;
  username: string;
  userId: string;
}

export interface APIPlaylist {
  duration: number;
  comments?: string[];
  followers?: string[];
  introduction: string;
  musics?: APIMusic[];
  title: string;
  user: APIUser;
  __v?: number;
  _id: string;
}
