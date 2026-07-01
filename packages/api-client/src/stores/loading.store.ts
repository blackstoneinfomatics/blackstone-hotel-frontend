import { create } from "zustand";

interface LoadingStore {
  activeRequests: number;

  start: () => void;

  stop: () => void;

  isLoading: () => boolean;
}

export const useLoadingStore =
  create<LoadingStore>((set, get) => ({

    activeRequests: 0,

    start: () =>
      set((state) => ({
        activeRequests: state.activeRequests + 1,
      })),

    stop: () =>
      set((state) => ({
        activeRequests: Math.max(
          state.activeRequests - 1,
          0
        ),
      })),

    isLoading: () =>
      get().activeRequests > 0,

  }));