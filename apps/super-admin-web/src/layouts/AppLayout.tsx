"use client";

import AuthGuard from "@/guards/AuthGuard";
import { AuthProvider } from "@/providers/AuthProvider";
// import Sidebar from "@/shared/components/Sidebar";
// import Header from "@/shared/components/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
    <AuthGuard>
      <div className="flex">
        {/* <Sidebar /> */}

        <div className="flex-1">
          {/* <Header /> */}

          <main>{children}</main>
        </div>
      </div>
    </AuthGuard>
    </AuthProvider>
  );
}