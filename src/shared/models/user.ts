import { APIAlbum } from "./album";
import { APIArtist } from "./artist";
import { APIMusic } from "./music";
import { APIPlaylist } from "./playlist";

export interface APIUser {
  comments?: string[];
  created_at?: string;
  email?: string;
  followers?: string[];
  followings?: {
    followingUsers: string[];
    followingAlbums: APIAlbum[];
    followingArtists: APIArtist[];
    followingPlaylists: APIPlaylist[];
  };
  introduction?: string;
  isAdmin?: boolean;
  likedComments?: string[];
  likedMusics?: APIMusic[];
  password?: string;
  playlists?: APIPlaylist[];
  recentMusics?: APIMusic[];
  username: string;
  __v?: number;
  _id: string;
}
