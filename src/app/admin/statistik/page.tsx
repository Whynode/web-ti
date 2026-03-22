import React from "react";
import { Save, Users, BookOpen, GraduationCap, Award } from "lucide-react";
import prisma from "@/lib/prisma";
import { updateStatistik } from "@/app/admin/statistik/actions";

async function getStatistik() {
  try {
    const statistik = await prisma.statistikSekolah.findUnique({
      where: { id: 1 },
    });
    return statistik;
  } catch (error) {
    console.error("Error fetching statistik:", error);
    return null;
  }
}

export default async function StatistikPage() {
  const statistik = await getStatistik();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#c0c0c0]">Statistik Sekolah</h1>
        <p className="text-sm text-[#666] mt-1">
          Update data statistik sekolah yang ditampilkan di homepage
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
                  {statistik?.totalSiswa ?? 0}
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
                  {statistik?.totalGuru ?? 0}
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
                  {statistik?.totalKelas ?? 0}
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
                <p className="text-[#666] text-sm font-medium">Total Alumni</p>
                <p className="text-[#c0c0c0] text-3xl font-bold">
                  {statistik?.totalAlumni ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#262626] p-6 lg:p-8">
        <h2 className="text-lg font-semibold text-[#c0c0c0] mb-6">Form Update Data</h2>
        <form action={updateStatistik} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="totalSiswa" className="block text-sm font-medium text-[#999]">
                Total Siswa
              </label>
              <input
                type="number"
                id="totalSiswa"
                name="totalSiswa"
                required
                min="0"
                defaultValue={statistik?.totalSiswa ?? 0}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalGuru" className="block text-sm font-medium text-[#999]">
                Total Guru
              </label>
              <input
                type="number"
                id="totalGuru"
                name="totalGuru"
                required
                min="0"
                defaultValue={statistik?.totalGuru ?? 0}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalKelas" className="block text-sm font-medium text-[#999]">
                Total Kelas
              </label>
              <input
                type="number"
                id="totalKelas"
                name="totalKelas"
                required
                min="0"
                defaultValue={statistik?.totalKelas ?? 0}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="totalAlumni" className="block text-sm font-medium text-[#999]">
                Total Alumni
              </label>
              <input
                type="number"
                id="totalAlumni"
                name="totalAlumni"
                required
                min="0"
                defaultValue={statistik?.totalAlumni ?? 0}
                className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-[#262626] text-[#c0c0c0] text-sm focus:outline-none focus:border-[#c0c0c0]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-[#262626]">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c0c0c0] text-[#0a0a0a] font-medium text-sm"
            >
              <Save className="w-4 h-4" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
