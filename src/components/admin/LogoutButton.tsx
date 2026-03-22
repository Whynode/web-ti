"use client";

import { useTransition } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { handleLogout } from "@/app/login/actions";

export default function LogoutButton({ collapsed }: { collapsed: boolean }) {
  const [isPending, startTransition] = useTransition();

  function onLogout() {
    startTransition(() => {
      handleLogout();
    });
  }

  return (
    <button
      onClick={onLogout}
      disabled={isPending}
      className="w-full flex items-center gap-3 px-3 py-2.5 text-[#c0c0c0] hover:bg-[#1a1a1a] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <>
          <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
          {!collapsed && (
            <span className="text-sm">Memuat...</span>
          )}
        </>
      ) : (
        <>
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && (
            <span className="text-sm">Keluar</span>
          )}
        </>
      )}
    </button>
  );
}
