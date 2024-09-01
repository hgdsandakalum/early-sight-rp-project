import { User } from "../../types";
import { create } from "zustand";

type State = {
  isAuthenticated: boolean;
  user: User;
};

type Action = {
  setIsAuthenticatedAction: (isAuthenticated: boolean) => void;
  setUserAction: (user: User) => void;
};

const initialState: State = {
  isAuthenticated: false,
  user: {
    id: 0,
    fullName: "",
    designation: "",
    username: "",
  },
};

export const useAuthStore = create<State & Action>((set) => ({
  ...initialState,
  setIsAuthenticatedAction: (isAuthenticated: boolean) =>
    set(() => ({
      isAuthenticated: isAuthenticated,
    })),
  setUserAction: (user: User) =>
    set(() => ({
      user: user,
    })),
}));
