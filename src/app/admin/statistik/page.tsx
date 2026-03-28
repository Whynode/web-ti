import React from "react";
import { Users, BookOpen, GraduationCap, Award } from "lucide-react";
import prisma from "@/lib/prisma";

async function getStats() {
  try {
    const [totalSiswa, totalGuru, totalKelas, totalAlumni] = await Promise.all([
      prisma.siswa.count(),
      prisma.guru.count(),
      prisma.kelas.count(),
      prisma.penempatanAlumni.count(),
    ]);

    return { totalSiswa, totalGuru, totalKelas, totalAlumni };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return { totalSiswa: 0, totalGuru: 0, totalKelas: 0, totalAlumni: 0 };
  }
}

export default async function StatistikPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#c0c0c0]">Statistik Sekolah</h1>
        <p className="text-sm text-[#666] mt-1">
          Data statistik realtime dari database
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#141414] border border-[#262626] overflow-hidden">
          <div className="bg-[#0a1628] p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#0f2847] flex items-center justify-center border border-[#1a3a5c]">
                <Users className="w-7 h-7 text-[#60a5fa]" />
              </div>
              <div>
                <p className="text-[#666] text-sm font-medium">Total Siswa</p>
                <p className="text-[#c0c0c0] text-3xl font-bold">
                  {stats.totalSiswa}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#262626] overflow-hidden">
          <div className="bg-[#1a0a2e] p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2a1a4c] flex items-center justify-center border border-[#3a2a5c]">
                <BookOpen className="w-7 h-7 text-[#a78bfa]" />
              </div>
              <div>
                <p className="text-[#666] text-sm font-medium">Total Guru</p>
                <p className="text-[#c0c0c0] text-3xl font-bold">
                  {stats.totalGuru}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#262626] overflow-hidden">
          <div className="bg-[#0a1a1a] p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#1a3a3a] flex items-center justify-center border border-[#2a4a4a]">
                <GraduationCap className="w-7 h-7 text-[#4ade80]" />
              </div>
              <div>
                <p className="text-[#666] text-sm font-medium">Total Kelas</p>
                <p className="text-[#c0c0c0] text-3xl font-bold">
                  {stats.totalKelas}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#262626] overflow-hidden">
          <div className="bg-[#1a0a0a] p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#3a1a1a] flex items-center justify-center border border-[#4a2a2a]">
                <Award className="w-7 h-7 text-[#fb923c]" />
              </div>
              <div>
                <p className="text-[#666] text-sm font-medium">Alumni Terlacak</p>
                <p className="text-[#c0c0c0] text-3xl font-bold">
                  {stats.totalAlumni}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-[#c0c0c0] mb-4">Catatan</h2>
        <p className="text-sm text-[#666]">
          Data di atas diambil secara dinamis dari database:
        </p>
        <ul className="text-sm text-[#666] mt-2 space-y-1">
          <li>• Total Siswa: Menghitung semua siswa di tabel <code>siswa</code></li>
          <li>• Total Guru: Menghitung semua guru di tabel <code>guru</code></li>
          <li>• Total Kelas: Menghitung semua kelas di tabel <code>kelas</code></li>
          <li>• Alumni Terlacak: Menghitung alumni yang sudah ditempatkan di tabel <code>penempatanAlumni</code></li>
        </ul>
      </div>
    </div>
  );
}
