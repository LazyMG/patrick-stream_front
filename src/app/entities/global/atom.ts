import { atom, selector } from "recoil";

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

interface IInitailFetchLoading {
  isRecentMusicsLoading: boolean;
  isTrendingMusicsLoading: boolean;
  isPopularMusicsLoading: boolean;
  isNewMusicsLoading: boolean;
  isFastSelectMusicsLoading: boolean;
}

export const isInitialFetchLoadingState = atom<IInitailFetchLoading>({
  key: "isInitialFetchLoadingState",
  default: {
    isRecentMusicsLoading: true,
    isTrendingMusicsLoading: true,
    isPopularMusicsLoading: true,
    isNewMusicsLoading: true,
    isFastSelectMusicsLoading: true,
  },
});

export const isInitialFetchLoadingSelector = selector({
  key: "isInitialFetchLoadingSelector",
  get: ({ get }) => {
    const initalLoadingState = get(isInitialFetchLoadingState);
    const isInitialLoading = Object.values(initalLoadingState).some(
      (value) => value === true
    );
    return isInitialLoading;
  },
});
