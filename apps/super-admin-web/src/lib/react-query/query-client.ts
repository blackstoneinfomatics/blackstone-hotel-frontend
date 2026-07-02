import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        const status = error?.response?.status;

        if (status >= 400 && status < 500) {
          return false;
        }

        return failureCount < 2;
      },

      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,

      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },

    mutations: {
      retry: false,
    },
  },
});