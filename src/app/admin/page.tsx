import prisma from "@/lib/prisma";
import Link from "next/link";
import { Users, BookOpen, Briefcase, FileText, GraduationCap, ArrowRight, ShieldCheck, Clock } from "lucide-react";

async function getStats() {
  try {
    const [guru, siswa, kelas, lowongan, materi, artikel] = await Promise.all([
      prisma.guru.count(),
      prisma.siswa.count(),
      prisma.kelas.count(),
      prisma.lowonganBKK.count({ where: { statusAktif: true } }),
      prisma.materiElearning.count(),
      prisma.artikelBlog.count(),
    ]);
    return { guru, siswa, kelas, lowongan, materi, artikel };
  } catch {
    return { guru: 0, siswa: 0, kelas: 0, lowongan: 0, materi: 0, artikel: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { label: "Total Guru", value: stats.guru, icon: Users, href: "/admin/guru" },
    { label: "Total Siswa", value: stats.siswa, icon: GraduationCap, href: "/admin/siswa" },
    { label: "Jumlah Kelas", value: stats.kelas, icon: BookOpen, href: "/admin/kelas" },
    { label: "Lowongan Aktif", value: stats.lowongan, icon: Briefcase, href: "/admin/bkk" },
    { label: "Materi E-Learning", value: stats.materi, icon: FileText, href: "/admin/elearning" },
    { label: "Artikel Blog", value: stats.artikel, icon: FileText, href: "/admin/blog" },
  ];

  const quickActions = [
    { label: "Tambah Guru", href: "/admin/guru/tambah", icon: Users },
    { label: "Tambah Lowongan", href: "/admin/bkk/tambah", icon: Briefcase },
    { label: "Tambah Materi", href: "/admin/elearning/tambah", icon: BookOpen },
    { label: "Tambah Artikel", href: "/admin/blog/tambah", icon: FileText },
    { label: "Kelola Kelas", href: "/admin/kelas", icon: GraduationCap },
    { label: "Statistik", href: "/admin/statistik", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#808080] mt-1">Selamat datang di panel administrasi</p>
        </div>
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

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-[#141414] border border-[#2a2a2a] p-4 hover:border-[#c0c0c0] transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5 text-[#808080]" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-[#808080] uppercase tracking-wider">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-[#141414] border border-[#2a2a2a] p-6">
        <h2 className="text-lg font-bold text-white mb-4 tracking-tight">Aksi Cepat</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-[#c0c0c0] hover:bg-[#2a2a2a] hover:text-white hover:border-[#c0c0c0] transition-colors"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#141414] border border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Ringkasan Data</h2>
            <Link href="/admin/statistik" className="text-xs text-[#c0c0c0] hover:text-white uppercase tracking-wider flex items-center gap-1">
              Detail <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-3 border-b border-[#2a2a2a]">
              <span className="text-sm text-[#808080]">Total Guru</span>
              <span className="text-sm font-bold text-white">{stats.guru} orang</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#2a2a2a]">
              <span className="text-sm text-[#808080]">Total Siswa</span>
              <span className="text-sm font-bold text-white">{stats.siswa} orang</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#2a2a2a]">
              <span className="text-sm text-[#808080]">Total Kelas</span>
              <span className="text-sm font-bold text-white">{stats.kelas} rombel</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-[#808080]">Lowongan Aktif</span>
              <span className="text-sm font-bold text-white">{stats.lowongan} lowongan</span>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Informasi Sistem</h2>
          </div>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-3 border-b border-[#2a2a2a]">
              <span className="text-sm text-[#808080]">Versi Aplikasi</span>
              <span className="text-sm font-bold text-white">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#2a2a2a]">
              <span className="text-sm text-[#808080]">Status Database</span>
              <span className="text-sm font-bold text-[#22c55e]">Terhubung</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#2a2a2a]">
              <span className="text-sm text-[#808080]">Storage Supabase</span>
              <span className="text-sm font-bold text-[#22c55e]">Aktif</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-[#808080]">Terakhir Update</span>
              <span className="text-sm text-white">{new Date().toLocaleDateString("id-ID")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
