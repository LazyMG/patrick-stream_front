import { atom } from "recoil";

interface IUserState {
  loading: boolean;
  userId: string;
}

export const userState = atom<IUserState>({
  key: "userState",
  default: {
    userId: "",
    loading: true,
  },
});
