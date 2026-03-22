"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center">
        <div className="container mx-auto px-6 max-w-xl text-center">
          <div className="bg-[#1a1d29] border border-white/10 rounded-[16px] p-10 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-brand-pink-start to-brand-blue-start flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold font-serif mb-3 text-white">
              Oops! Terjadi kesalahan pada sistem
            </h1>

            <p className="text-white/60 mb-8 text-sm leading-relaxed">
              Maaf, terjadi kesalahan yang tidak terduga. Tim kami sudah mencatat masalah ini dan akan segera memperbaikinya.
            </p>

            {error?.digest && (
              <p className="text-[10px] text-white/30 font-mono mb-6 uppercase tracking-wider">
                Error ID: {error.digest}
              </p>
            )}

            <button
              onClick={() => reset()}
              className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start text-white font-bold px-8 py-4 rounded-[10px] text-sm uppercase tracking-widest hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-brand-pink-start/20"
            >
              Coba Lagi
            </button>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[11px] text-white/40">
                Hubungi kami di{" "}
                <span className="text-brand-pink-start">info@smkstelematika.sch.id</span>{" "}
                jika masalah terus berlanjut.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
