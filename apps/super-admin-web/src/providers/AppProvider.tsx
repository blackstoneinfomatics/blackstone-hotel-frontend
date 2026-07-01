"use client";

import { AuthProvider } from "../providers/AuthProvider";
import  QueryProvider  from "../providers/QueryProvider";

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  );
}