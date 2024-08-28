import { User } from "../../types";
import { create } from "zustand";

type State = {
  isAuthenticated: boolean;
  user: User | undefined;
};
type Action = {
  setIsAuthenticatedAction: (isAuthenticated: boolean) => void;
  setUserAction: (user: any) => void;
};
const initialState: State = {
  isAuthenticated: false,
  user: undefined,
};

export const useAuthStore = create<State & Action>((set) => ({
  ...initialState,
  setIsAuthenticatedAction: (isAuthenticated: boolean) =>
    set(() => ({
      isAuthenticated,
    })),
  setUserAction: (user: any) =>
    set(() => ({
      user,
    })),
}));
