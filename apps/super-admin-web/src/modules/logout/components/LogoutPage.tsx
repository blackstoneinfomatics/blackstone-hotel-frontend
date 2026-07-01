"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useLogout } from "../hooks/useLogout";

export default function LogoutPage() {
  const router = useRouter();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
const { mutateAsync: logout, isPending } = useLogout();

const handleLogout = () => {
  logout(undefined, {
    onSuccess: () => {
  
      setIsLoggedOut(true);

      setTimeout(() => {
        router.replace("/login");
      }, 4500);
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};

  return (
    <main>
      <div className="flex min-h-screen bg-gray-100 transition-colors duration-500">
        <div className="relative hidden w-1/2 overflow-hidden lg:flex">
          <Image
            src="/assests/logout4.png"
            alt="Logout"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/80 shadow-[0_25px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-orange-400/20 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-amber-400/20 blur-3xl"></div>

            <div className="relative p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Session Status</p>

                    <h2 className="text-2xl font-bold text-slate-900">Logged Out</h2>
                  </div>
                </div>
              </div>

              {!isLoggedOut && (
                <>
                  <h1 className="mt-8 text-3xl font-bold text-slate-900">
                    Goodbye, See You Soon 👋
                  </h1>

                  <p className="mt-4 text-[15px] leading-7 text-slate-600">
                    Your hotel management session has been ended securely. All
                    active sessions have been closed successfully.
                  </p>
                </>
              )}

              <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5 transition-all duration-500">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>

                  <span className="font-semibold text-green-700">
                    {isLoggedOut ? "Account Protected" : "Signed out successfully"}
                  </span>
                </div>

                {!isLoggedOut ? (
                  <div className="mt-4">
                    <p className="break-all text-base font-semibold text-slate-900">
                      jeevimadhes06@gmail.com
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="mt-3 text-sm text-slate-600">
                      Your information is secure. Login again anytime to continue
                      managing bookings, guests and hotel operations.
                    </p>

                    <div className="mt-4">
                      <p className="break-all text-base font-semibold text-slate-900">
                        jeevimadhes06@gmail.com
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Security</p>

                        <h3 className="mt-1 font-semibold text-slate-900">
                          Session Closed
                        </h3>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Status</p>

                        <h3 className="mt-1 font-semibold text-orange-500">
                          Safe Logout
                        </h3>
                      </div>
                    </div>
                  </>
                )}
              </div>

             <Button
  onClick={handleLogout}
  disabled={isPending || isLoggedOut}
  className="mt-8 h-14 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-base font-semibold text-white hover:from-orange-600 hover:to-amber-600 disabled:opacity-100"
>
  <ArrowLeft className="mr-2 h-5 w-5" />

  {isPending
    ? "Logging out..."
    : isLoggedOut
    ? "Redirecting..."
    : "Logout"}
</Button>

              <p className="mt-6 text-center text-sm text-slate-500">
                Thank you for choosing{" "}
                <span className="font-semibold text-orange-500">
                  Blackstone Hotel
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}