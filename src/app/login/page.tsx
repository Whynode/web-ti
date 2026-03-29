"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { handleLogin } from "./actions";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await handleLogin(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#141414] mb-4 border border-[#262626]">
            <ShieldCheck className="w-8 h-8 text-[#c0c0c0]" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-[#c0c0c0]">
            Admin Portal
          </h1>
          <p className="text-sm text-[#666] mt-2">
            SMKS Telematika Indramayu
          </p>
        </div>

        <div className="bg-[#141414] border border-[#262626] p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-[#c0c0c0]">Selamat Datang</h2>
            <p className="text-xs text-[#666] mt-1">
              Silakan masuk untuk melanjutkan
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-[#1a0a0a] border border-[#662626]">
              <p className="text-sm text-[#ff6b6b] text-center font-medium">
                {error}
              </p>
            </div>
          )}

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-bold text-[#999] mb-2 uppercase tracking-wider"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  autoComplete="username"
                  placeholder="Masukkan username"
                  className="w-full px-4 py-3 pl-11 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-[#555]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#999] mb-2 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 pl-11 pr-11 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0] placeholder:text-[#555]"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-[#555]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#c0c0c0]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#c0c0c0] text-[#0a0a0a] font-bold py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Memproses...</span>
                </>
              ) : (
                <span className="text-sm">Masuk</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#262626]">
            <div className="flex items-center justify-center gap-2 text-[10px] text-[#555]">
              <ShieldCheck className="w-3 h-3" />
              <span>Akses Terbatas untuk Administrator</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-[#666] hover:text-[#c0c0c0]"
          >
            &larr; Kembali ke Website
          </Link>
        </div>
      </div>
    </main>
  );
}