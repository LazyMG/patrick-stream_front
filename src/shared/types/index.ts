export interface IMusicFormInput {
  title: string;
  duration: number;
  ytId: string;
  released_at: string;
  genre: string;
  coverImg: string;
}

export interface IAlbumFormInput {
  title: string;
  length: number;
  introduction: string;
  released_at: string;
  category: string;
  coverImg: string;
}

export interface IArtistFormInput {
  artistname: string;
  introduction: string;
  debut_at: string;
  country: string;
  coverImg: string;
}
