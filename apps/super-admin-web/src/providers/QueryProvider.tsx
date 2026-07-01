"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import axios, { AxiosError } from "axios";

interface Props {
  children: ReactNode;
}

export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              if (axios.isAxiosError(error)) {
                const status = error.response?.status;

                if (status && status >= 400 && status < 500) {
                  return false;
                }
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
            // Never retry mutations globally
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
