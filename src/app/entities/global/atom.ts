import { atom } from "recoil";

interface IBackgroundState {
  src: string;
  type: "blur" | "simple";
}

export const backgroundState = atom<IBackgroundState | null>({
  key: "backgroundState",
  default: null,
});

export const isToastOpenState = atom<boolean>({
  key: "isToastOpenState",
  default: false,
});
