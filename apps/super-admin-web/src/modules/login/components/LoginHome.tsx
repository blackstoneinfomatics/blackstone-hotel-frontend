"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";


export default function LoginHome() {
  const [showPassword, setShowPassword] = useState(false);
   const {mutateAsync: login, isPending} = useLogin();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await login({email, password});

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
<main className="h-screen w-full overflow-hidden bg-slate-900">
  <div className="grid h-full w-full lg:grid-cols-2">

    {/* Left Image */}
    <div className="relative hidden lg:block">
      <Image
        src="/assests/login1.png"
        alt="Hotel"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />
      </div>

                  {/* Right Side */}

        <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 via-white to-orange-50 dark:from-[#0B1220] dark:via-[#101827] dark:to-[#1B2434] px-6 py-6">

                  {/* Outer Glow */}
          <div className="relative w-full max-w-md">


                    {/* Card */}
            <div
              className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/20
              bg-white
              dark:bg-[#111827]/95
              shadow-[0_20px_70px_rgba(0,0,0,0.15)]
              dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
            "
            >

              <div className="absolute -right-30 -top-10 h-52 w-52 rounded-full bg-orange-200/20 blur-3xl"></div>
                <div className="absolute -bottom-10 -left-30 h-52 w-52 rounded-full bg-amber-200/20 blur-3xl"></div>

                          {/* Decorative Circle */}

                  <div className="relative px-8 py-8">

                          {/* Heading */}

                    <div className="mt-6 text-center">

                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            Welcome Back
                      </h1>

                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                            Sign in to access your Hotel Dashboard
                      </p>

                    </div>

                                  {/* Form */}

                    <form
                      onSubmit={handleLogin}
                      className="mt-8 space-y-5"
                    >

                                  {/* Email */}

                    <div>

                      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>

                    <div className="relative">

                      <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />

                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        className="
                        h-14
                        rounded-2xl
                        border
                        border-slate-200
                        dark:border-slate-700
                        bg-slate-50
                        dark:bg-slate-900
                        pl-12
                        text-slate-900
                        dark:text-white
                        placeholder:text-slate-400
                        focus:border-orange-500
                        focus:ring-4
                        focus:ring-orange-500/20
                        "
                      />

                    </div>

                  </div>

                               {/* Password */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password
                    </label>

                    <div className="relative">

                      <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />

                        <Input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter Password"
                          className="
                          h-14
                          rounded-2xl
                          border
                          border-slate-200
                          dark:border-slate-700
                          bg-slate-50
                          dark:bg-slate-900
                          pl-12
                          pr-12
                          text-slate-900
                          dark:text-white
                          placeholder:text-slate-400
                          focus:border-orange-500
                          focus:ring-4
                          focus:ring-orange-500/20
                          "
                        />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                      >
                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                      </button>

            </div>

          </div>

          {/* Remember */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Checkbox />

              <span className="text-sm text-slate-600 dark:text-slate-400">
                Remember me
              </span>

            </div>

            <button
              type="button"
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Forgot Password?
            </button>

          </div>

          {/* Login */}

          <Button
            className="
            h-14
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-orange-500
            to-amber-500
            text-lg
            font-semibold
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:shadow-xl
            hover:shadow-orange-500/30
            "
          >
            {isPending ? "Signing In..." : "Sign In"}
          </Button>

          {/* Divider */}

          <div className="flex items-center gap-3">

            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />

            <span className="text-xs text-slate-500">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />

          </div>

          {/* Google */}

          <Button
            variant="outline"
            className="
            h-14
            w-full
            rounded-2xl
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            hover:bg-slate-100
            dark:hover:bg-slate-800
            "
          >
            <FcGoogle className="mr-3 h-6 w-6" />
            Continue with Google
          </Button>

        </form>

      </div>

    </div>

  </div>

</div>
  </div>
</main>
  );
}