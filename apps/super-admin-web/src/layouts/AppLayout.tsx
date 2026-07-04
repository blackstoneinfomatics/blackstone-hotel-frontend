"use client";

import { useState } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
// import AuthGuard from "@/guards/AuthGuard";
import Sidebar from "@/shared/components/sidebar";
import Header from "@/shared/components/header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mobile Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Desktop Collapse
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthProvider>
      {/* <AuthGuard> */}

<div className="min-h-screen">

        <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
        />

        <main
            className={
                collapsed
                    ? "lg:ml-20"
                    : "lg:ml-72"
            }
        >

            <Header
                onMenuClick={() =>
                    setSidebarOpen(true)
                }
            />

            {children}

        </main>

    </div>

      {/* </AuthGuard> */}
    </AuthProvider>
  );
}