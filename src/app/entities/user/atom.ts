import { atom } from "recoil";

interface ITestUser {
  id: number;
  username: string;
}

export const userState = atom<ITestUser | null>({
  key: "userState",
  default: null,
});
