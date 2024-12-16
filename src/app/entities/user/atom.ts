import { atom } from "recoil";

interface IUserState {
  loading: boolean;
  userId: string;
  username: string;
}

// id,username 가져오기
export const userState = atom<IUserState>({
  key: "userState",
  default: {
    userId: "",
    loading: true,
    username: "",
  },
});
