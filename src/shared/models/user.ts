import { APIMusic } from "./music";

export interface User {}

export interface APIUser {
  comments?: string[];
  created_at?: string;
  email?: string;
  followers?: string[];
  followings?: string[];
  introduction?: string;
  isAdmin?: boolean;
  likedComments?: string[];
  likedMusics?: APIMusic[];
  password?: string;
  playlists?: string[];
  recentMusics?: APIMusic[];
  username: string;
  __v?: number;
  _id: string;
}
