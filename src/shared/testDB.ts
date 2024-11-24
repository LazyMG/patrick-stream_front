import { Album } from "./models/album";
import { Artist } from "./models/artist";
import { Music } from "./models/music";

export const musics: Music[] = [
  {
    id: "music0",
    title: "music0",
    artists: ["artist0"],
    album: "ablum0",
    duration: 10,
    counts: {
      likes: 5,
      view: 10,
    },
    ytId: "123",
    released_at: new Date(),
    genre: ["노래", "테스트"],
    coverImg: "123",
    created_at: new Date(),
  },
  {
    id: "music1",
    title: "music1",
    artists: ["artist0"],
    album: "ablum0",
    duration: 10,
    counts: {
      likes: 5,
      view: 10,
    },
    ytId: "123",
    released_at: new Date(),
    genre: ["노래", "테스트"],
    coverImg: "123",
    created_at: new Date(),
  },
  {
    id: "music3",
    title: "music3",
    artists: ["artist0"],
    album: "ablum0",
    duration: 10,
    counts: {
      likes: 5,
      view: 10,
    },
    ytId: "123",
    released_at: new Date(),
    genre: ["노래", "테스트"],
    coverImg: "123",
    created_at: new Date(),
  },
  {
    id: "music4",
    title: "music4",
    artists: ["artist0"],
    album: "ablum0",
    duration: 10,
    counts: {
      likes: 5,
      view: 10,
    },
    ytId: "123",
    released_at: new Date(),
    genre: ["노래", "테스트"],
    coverImg: "123",
    created_at: new Date(),
  },
];

export const albums: Album[] = [
  {
    id: "album0",
    artists: ["artist0"],
    category: "EP",
    coverImg: "123",
    introduction: "good",
    length: 3,
    musics: ["music0", "music1"],
    released_at: new Date(),
    title: "album0",
    total_duration: 20,
  },
];

export const artists: Artist[] = [
  {
    id: "artist0",
    albums: ["album0"],
    artistname: "singer",
    country: "kor",
    coverImg: "123",
    debut_at: new Date(),
    introduction: "good",
    musics: ["music0", "music2", "music3"],
  },
];
