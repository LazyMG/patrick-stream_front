import { Artist } from "../models/artist";
import { artists } from "../testDB";

export const _getAritsts = () => {
  return artists;
};

export const _getArtistInfo = (artistId: string) => {
  const artist: Artist | undefined = artists.find(
    (artist) => artist.id == artistId
  );

  if (!artist) return null;
  return artist.artistname;
};

export const _getArtistsCount = () => {
  return artists.length;
};
