"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/auth/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            deviceid: "WEB",
            role: "SUPER_ADMIN",
            appversion: "1.0.0",
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response", data);

      if (response.ok) {
        localStorage.setItem(
          "accessToken",
          data.accessToken
        );

        localStorage.setItem(
          "refreshToken",
          data.refreshToken
        );

        localStorage.setItem(
          "userDetails",
          JSON.stringify(data.userDetails)
        );

        alert("Login Successful");

        // router.push("/dashboard");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center">
          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Blackstone Hotel
          </h1>

          <p className="mt-2 text-center text-slate-500">
            Sign in to your admin account
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-6"
          autoComplete="on"
          onSubmit={handleLogin}
        >
          {/* Email */}
          <div className="space-y-2">
            <label className="mb-2 block text-md text-gray-700">
              Email Address{" "}
              <span className="text-red-500">*</span>
            </label>

            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              placeholder="Enter your email address"
              className="h-14 rounded-xl"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="mb-2 block text-md text-gray-700">
              Password{" "}
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={
                  showPassword ? "text" : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-14 pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff className="h-6 w-6" />
                ) : (
                  <Eye className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                id="remember-me"
                className="size-5 border-2 border-slate-300 shadow-sm"
              />

              <label
                htmlFor="remember-me"
                className="text-sm font-medium text-slate-700"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              className="text-sm font-medium text-emerald-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="h-14 w-full rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-14 w-full rounded-xl"
          >
            Continue with Google
          </Button>
        </form>
      </div>
    </main>
  );
}