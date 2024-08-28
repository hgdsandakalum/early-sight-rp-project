import { create } from "zustand";

type State = {
  isMobile: boolean;
  screenSize: string;
};

type Action = {
  setIsMobileAction: (isMobile: boolean) => void;
  setScreenSizerAction: (screenSize: string) => void;
};
const initialState: State = {
  isMobile: false,
  screenSize: "",
};

export const useMobileStore = create<State & Action>((set) => ({
  ...initialState,
  setIsMobileAction: (isMobile: boolean) =>
    set(() => ({
      isMobile,
    })),
  setScreenSizerAction: (screenSize: string) =>
    set(() => ({
      screenSize,
    })),
}));
