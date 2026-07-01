"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { loading, authenticated } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!authenticated) {
      const redirectUrl = encodeURIComponent(pathname);

      router.replace(`/login?redirect=${redirectUrl}`);
    }
  }, [loading, authenticated, pathname, router]);

  /**
   * Still checking authentication
   */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  /**
   * Prevent page flash while redirecting
   */
  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}