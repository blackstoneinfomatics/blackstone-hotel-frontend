import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;

  setTokens: (
    accessToken: string,
    refreshToken: string
  ) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthStore>(
  (set) => ({
    accessToken: null,
    refreshToken: null,

    setTokens: (accessToken, refreshToken) =>
      set({
        accessToken,
        refreshToken,
      }),

    logout: () =>
      set({
        accessToken: null,
        refreshToken: null,
      }),
  })
);