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
  <main className="min-h-screen">
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side Image */}
      <div className="relative hidden lg:block">
 <Image
    src="/assests/image2.png"
    alt="Hotel"
    fill
    className="object-cover"
    priority
  />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 flex items-center justify-center p-12">
        </div>
      </div>

      {/* Right Side */}
      <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 px-6 py-10">
        {/* Glass Card */}
<div
  className={`${hanken.className} w-full max-w-lg rounded-[35px] border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-3xl`}
>
            <div className="mb-10 text-center">
<h2
  className="text-4xl font-bold text-white"
>
  Blackstone Hotel
</h2>

            <p className="mt-3 text-white/70">
              Sign in to your admin account
            </p>
          </div>

          <form
            className="space-y-6"
            autoComplete="on"
            onSubmit={handleLogin}
          >
            {/* Email */}
            <div>
              <label className="mb-2 block text-white">
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
              <label className="mb-2 block text-white">
                Password
              </label>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="h-14 rounded-xl border-0 bg-white pr-12 text-black placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
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
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" />

                <label htmlFor="remember-me">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                className="text-sm text-[#ff8c00] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

<Button
  type="submit"
  disabled={loading}
  className="h-14 w-full rounded-xl bg-[#ff8c00] text-lg text-white transition-all duration-300 hover:bg-emerald-600"
>
  {loading ? "Signing In..." : "Sign In"}
</Button>

           <div className="flex items-center gap-4">
  <div className="h-px flex-1 bg-white/20"></div>

  <span className="text-sm text-white/70 whitespace-nowrap">
    Or continue with
  </span>

  <div className="h-px flex-1 bg-white/20"></div>
</div>

            <Button
  type="button"
  variant="outline"
  className="h-14 w-full border-white/30 bg-white/10 text-white hover:bg-white/20"
>
  <FcGoogle className="mr-2 h-6 w-6" />
  Continue with Google
</Button>
          </form>
        </div>
      </div>
    </div>
  </main>
  );
}