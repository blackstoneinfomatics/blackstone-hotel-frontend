"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Hanken_Grotesk } from "next/font/google";
import { FcGoogle } from "react-icons/fc";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function LoginHome() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useLogin();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await login(email, password);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
<main className="min-h-screen bg-slate-900">
  <div className="grid min-h-screen lg:grid-cols-2">

    {/* Left Image */}
    <div className="relative hidden lg:block">
      <Image
        src="/assests/image2.png"
        alt="Hotel"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />
    </div>

    {/* Right Side */}
<div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-6">
        <div
    className={`${hanken.className}
      w-full
      max-w-[520px]
      rounded-[32px]
      border border-white/20
      bg-white/10
      p-10
      shadow-2xl
      backdrop-blur-3xl`}
  >
        {/* Heading */}

        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-3xl font-bold text-white">
            Blackstone Hotel
          </h2>

          <p className="mt-2 text-sm text-white/70 sm:text-base">
            Sign in to your admin account
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          autoComplete="on"
          className="space-y-6"
        >
          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white sm:text-base">
              Email Address
            </label>

            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-14 rounded-xl border-0 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-white sm:text-base">
              Password
            </label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-14 rounded-xl border-0 bg-white pr-12 text-black placeholder:text-gray-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember */}

          <div className="flex flex-col gap-3 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember-me" />

              <label
                htmlFor="remember-me"
                className="text-sm sm:text-base"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="text-left text-sm text-[#ff8c00] hover:underline sm:text-right"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login */}

          <Button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-xl bg-[#ff8c00] text-base text-white transition hover:bg-emerald-600 sm:text-lg"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Divider */}

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/20"></div>

            <span className="whitespace-nowrap text-xs text-white/70 sm:text-sm">
              Or continue with
            </span>

            <div className="h-px flex-1 bg-white/20"></div>
          </div>

          {/* Google */}

          <Button
            type="button"
            variant="outline"
            className="h-14 w-full border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <FcGoogle className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
            Continue with Google
          </Button>
        </form>
      </div>
    </div>
  </div>
</main>
  );
}