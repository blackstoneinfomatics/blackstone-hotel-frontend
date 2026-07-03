"use client";

import { useState } from "react";
import AuthGuard from "@/guards/AuthGuard";
import { AuthProvider } from "@/providers/AuthProvider";
import Sidebar from "@/shared/components/sidebar";

export default function AppLayout({

  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AuthProvider>
      {/* <AuthGuard> */}
      <div className="flex min-h-screen">
        <Sidebar
  open={sidebarOpen}
  collapsed={collapsed}
  onClose={() => setSidebarOpen(false)}
  onCollapse={() => setCollapsed(!collapsed)}
/>

        <div className="flex-1">
          {children}
        </div>
      </div>
      {/* </AuthGuard> */}
    </AuthProvider>
  );
}