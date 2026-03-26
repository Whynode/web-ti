"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function ClockDisplay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-zinc-500">
      <Clock className="w-4 h-4" />
      <span className="text-xs">
        {new Date().toLocaleDateString("id-ID", { 
          weekday: "long", 
          day: "numeric", 
          month: "long", 
          year: "numeric" 
        })}
      </span>
    </div>
  );
}

export function DateDisplay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-sm font-bold text-white">-</span>;
  }

  return (
    <span className="text-sm font-bold text-white">{new Date().toLocaleDateString("id-ID")}</span>
  );
}