"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  BookOpen,
  FileText,
  BarChart3,
  Menu,
  X,
  Home,
  LayoutGrid,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap,
  Clock,
  ShieldCheck
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/guru", label: "Guru", icon: Users },
  { href: "/admin/kelas", label: "Kelas", icon: GraduationCap },
  { href: "/admin/siswa", label: "Siswa", icon: UserCircle },
  { href: "/admin/bkk", label: "BKK", icon: Briefcase },
  { href: "/admin/elearning", label: "E-Learning", icon: BookOpen },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/statistik", label: "Statistik", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-black border-r border-[#2a2a2a]">
      <div className="p-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#c0c0c0] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-black" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight">SMKS TI</span>
              <span className="text-[10px] text-[#808080] uppercase tracking-widest">Admin Panel</span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 transition-colors
                ${isActive 
                  ? "bg-[#c0c0c0] text-black font-semibold" 
                  : "text-[#c0c0c0] hover:bg-[#1a1a1a] hover:text-white"
                }
              `}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && (
                <span className="text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#2a2a2a]">
        <div className="mb-2">
          <LogoutButton collapsed={isCollapsed} />
        </div>
        
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-[#808080] hover:bg-[#1a1a1a] hover:text-white transition-colors"
        >
          <Home className="w-5 h-5 shrink-0" />
          {!isCollapsed && (
            <span className="text-sm">Kembali ke Website</span>
          )}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-black border-r border-[#2a2a2a] transition-all duration-200
          ${isCollapsed ? "w-16" : "w-64"}
          hidden lg:block
        `}
      >
        <SidebarContent />
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-black border-r border-[#2a2a2a]">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className={`flex-1 transition-all duration-200 ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[#2a2a2a]">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 text-[#c0c0c0] hover:text-white hover:bg-[#1a1a1a]"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-2 text-[#c0c0c0] hover:text-white hover:bg-[#1a1a1a]"
              >
                {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-[#808080]">
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
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
