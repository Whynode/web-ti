"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
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
  ShieldCheck,
  ClipboardList,
  Handshake,
  Laptop,
  ChevronDown,
  UsersRound,
  Image
} from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";
import { ClockDisplay } from "@/components/ui/ClockDisplay";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/ppdb", label: "PPDB", icon: ClipboardList },
  { href: "/admin/guru", label: "Guru", icon: Users },
  { href: "/admin/kelas", label: "Kelas", icon: GraduationCap },
  { href: "/admin/siswa", label: "Siswa", icon: UserCircle },
  { 
    href: "/admin/bkk", 
    label: "BKK", 
    icon: Briefcase,
    submenu: [
      { href: "/admin/bkk/mitra", label: "Mitra Industri", icon: Handshake },
      { href: "/admin/bkk/lowongan", label: "Lowongan Kerja", icon: Laptop },
      { href: "/admin/bkk/penempatan", label: "Data Penempatan", icon: UsersRound },
    ]
  },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/galeri", label: "Galeri", icon: Image },
  { href: "/admin/statistik", label: "Statistik", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [bkkExpanded, setBkkExpanded] = useState(true);
  const pathname = usePathname();

  const isBkkActive = pathname.startsWith("/admin/bkk");

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-black border-r border-zinc-800">
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-zinc-400" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight">SMKS TI</span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Admin Panel</span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          
          if (item.submenu) {
            return (
              <div key={item.href}>
                <button
                  onClick={() => setBkkExpanded(!bkkExpanded)}
                  className={`
                    w-full flex items-center justify-between gap-3 px-3 py-2.5 transition-colors rounded-md
                    ${isBkkActive
                      ? "bg-zinc-800 text-white font-medium"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="text-sm">{item.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${bkkExpanded ? 'rotate-180' : ''}`} />
                  )}
                </button>
                {bkkExpanded && !isCollapsed && (
                  <div className="ml-6 mt-1 space-y-1 border-l border-zinc-800 pl-3">
                    {item.submenu.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      const SubIcon = subItem.icon;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`
                            flex items-center gap-3 px-3 py-2 transition-colors rounded-md
                            ${isSubActive
                              ? "bg-brand-pink-start/20 text-brand-pink-start"
                              : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
                            }
                          `}
                        >
                          <SubIcon className="w-4 h-4 shrink-0" />
                          <span className="text-sm">{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 transition-colors rounded-md
                ${isActive 
                  ? "bg-zinc-800 text-white font-medium" 
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
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

      <div className="p-3 border-t border-zinc-800">
        <div className="mb-2">
          <LogoutButton collapsed={isCollapsed} />
        </div>
        
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 text-zinc-500 hover:bg-zinc-900 hover:text-white transition-colors rounded-md"
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
    <div className="flex min-h-screen bg-black">
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-black border-r border-zinc-800 transition-all duration-200
          ${isCollapsed ? "w-16" : "w-64"}
          hidden lg:block
        `}
      >
        <SidebarContent />
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-black border-r border-zinc-800">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className={`flex-1 transition-all duration-200 ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}`}>
        <header className="sticky top-0 z-40 bg-black border-b border-zinc-800">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-2 text-zinc-400 hover:text-white hover:bg-zinc-900"
              >
                {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex">
                <ClockDisplay />
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
