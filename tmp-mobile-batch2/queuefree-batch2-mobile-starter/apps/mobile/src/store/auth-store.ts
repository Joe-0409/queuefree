import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  phoneNumber: string;
  accessToken: string;
  setPhoneNumber: (phoneNumber: string) => void;
  login: (phoneNumber: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  phoneNumber: "",
  accessToken: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  login: (phoneNumber) =>
    set({
      isAuthenticated: true,
      phoneNumber,
      accessToken: `demo-token-for-${phoneNumber}`
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      phoneNumber: "",
      accessToken: ""
    })
}));
