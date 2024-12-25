import { atom } from "recoil";
import { APIUser } from "../../../shared/models/user";

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

export const userDataState = atom<APIUser | null>({
  key: "userDataState",
  default: null,
});
