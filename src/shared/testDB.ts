import { Album } from "./models/album";
import { Artist } from "./models/artist";
import { Music } from "./models/music";

export const musics: Music[] = [
  {
    id: "music0",
    title: "우주를 건너",
    artists: ["artist0"],
    album: "ablum0",
    duration: 10,
    counts: {
      likes: 5,
      view: 10,
    },
    ytId: "cQuqs2LrXbo",
    released_at: new Date().toDateString(),
    genre: ["노래", "테스트"],
    coverImg:
      "https://i.scdn.co/image/ab67616d00001e02ff1533e6c9c6435c37759764",
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
    released_at: new Date().toDateString(),
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
    released_at: new Date().toDateString(),
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
    released_at: new Date().toDateString(),
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
  {
    id: "album1",
    artists: ["artist0"],
    category: "EP",
    coverImg: "123",
    introduction: "good",
    length: 3,
    musics: ["music2", "music3"],
    released_at: new Date(),
    title: "album1",
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
