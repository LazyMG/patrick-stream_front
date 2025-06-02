import { atom } from "recoil";

interface IBackgroundState {
  src: string;
  type: "blur" | "simple";
}

export const backgroundState = atom<IBackgroundState | null>({
  key: "backgroundState",
  default: null,
});

interface IToast {
  text: string;
  toastKey: string;
}

interface IGlobalToastConfig {
  closeToast: (key: string) => void;
  toasts: IToast[];
}

export const globalToastConfigState = atom<IGlobalToastConfig | null>({
  key: "globalToastConfigState",
  default: null,
});

export const isPlaylistToastOpenState = atom<boolean>({
  key: "isPlaylistToastOpenState",
  default: false,
});

interface IIsSideBarChangeConfig {
  size: "BIG" | "ETC" | "";
  isChange: boolean;
}

export const isSideBarChangeConfigState = atom<IIsSideBarChangeConfig>({
  key: "isSideBarChangeConfigState",
  default: {
    size: "",
    isChange: false,
  },
});
