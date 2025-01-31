import { APIAlbum } from "./album";
import { APIMusic } from "./music";

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

export type ArtistIDs =
  | "artistname"
  | "country"
  | "coverImg"
  | "introduction"
  | "debut_at";

export interface IOutletArtist {
  artist: APIArtist;
  setArtist: React.Dispatch<React.SetStateAction<APIArtist>>;
}
