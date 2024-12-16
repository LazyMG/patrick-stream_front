export interface APIUserPlaylist {
  id: string;
  title: string;
  duration: number;
  introduction: string;
  followersCount: number;
  username: string;
  userId: string;
}
// 수정 필요요
export interface APIPlaylist {
  duration: number;
  comments?: string[];
  followers?: string[];
  introduction: string;
  musics: string[];
  title: string;
  user: {
    username: string;
    _id: string;
  };
  __v: number;
  _id: string;
}
