import prisma from "@/lib/prisma";
import Link from "next/link";
import { Users, BookOpen, Briefcase, FileText, GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";
import { ClockDisplay, DateDisplay } from "@/components/ui/ClockDisplay";

async function getStats() {
  let retries = 3;
  while (retries > 0) {
    try {
      const [guru, siswa, kelas, lowongan, artikel] = await Promise.all([
        prisma.guru.count(),
        prisma.siswa.count(),
        prisma.kelas.count(),
        prisma.lowonganBKK.count({ where: { statusAktif: true } }),
        prisma.artikelBlog.count(),
      ]);
      return { guru, siswa, kelas, lowongan, artikel };
    } catch (error) {
      console.error("Error fetching stats, retries left:", retries, error);
      retries--;
      if (retries === 0) break;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return { guru: 0, siswa: 0, kelas: 0, lowongan: 0, artikel: 0 };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const statCards = [
    { label: "Total Guru", value: stats.guru, icon: Users, href: "/admin/guru" },
    { label: "Total Siswa", value: stats.siswa, icon: GraduationCap, href: "/admin/siswa" },
    { label: "Jumlah Kelas", value: stats.kelas, icon: BookOpen, href: "/admin/kelas" },
    { label: "Lowongan Aktif", value: stats.lowongan, icon: Briefcase, href: "/admin/bkk" },
    { label: "Artikel Blog", value: stats.artikel, icon: FileText, href: "/admin/blog" },
  ];

  const quickActions = [
    { label: "Tambah Guru", href: "/admin/guru/tambah", icon: Users },
    { label: "Tambah Lowongan", href: "/admin/bkk/tambah", icon: Briefcase },
    { label: "Tambah Artikel", href: "/admin/blog/tambah", icon: FileText },
    { label: "Kelola Kelas", href: "/admin/kelas", icon: GraduationCap },
    { label: "Statistik", href: "/admin/statistik", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Selamat datang di panel administrasi</p>
        </div>
        <div className="hidden sm:flex">
          <ClockDisplay />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5 text-zinc-500" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6">
        <h2 className="text-lg font-bold text-white mb-4 tracking-tight">Aksi Cepat</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 px-4 py-3 bg-black border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-colors"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Ringkasan Data</h2>
            <Link href="/admin/statistik" className="text-xs text-zinc-400 hover:text-white uppercase tracking-wider flex items-center gap-1">
              Detail <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-sm text-zinc-500">Total Guru</span>
              <span className="text-sm font-bold text-white">{stats.guru} orang</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-sm text-zinc-500">Total Siswa</span>
              <span className="text-sm font-bold text-white">{stats.siswa} orang</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-sm text-zinc-500">Total Kelas</span>
              <span className="text-sm font-bold text-white">{stats.kelas} rombel</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-zinc-500">Lowongan Aktif</span>
              <span className="text-sm font-bold text-white">{stats.lowongan} lowongan</span>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-tight">Informasi Sistem</h2>
          </div>
          <div className="space-y-0">
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-sm text-zinc-500">Versi Aplikasi</span>
              <span className="text-sm font-bold text-white">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-sm text-zinc-500">Status Database</span>
              <span className="text-sm font-bold text-green-500">Terhubung</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <span className="text-sm text-zinc-500">Storage Supabase</span>
              <span className="text-sm font-bold text-green-500">Aktif</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-zinc-500">Terakhir Update</span>
              <DateDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
