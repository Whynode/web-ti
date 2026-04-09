'use server'

import prisma from '@/lib/prisma'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const ppdbSchema = z.object({
  namaLengkap: z.string().min(1, 'Nama lengkap wajib diisi'),
  nisn: z.string().min(10, 'NISN harus 10 digit').max(10, 'NISN harus 10 digit'),
  asalSekolah: z.string().min(1, 'Asal sekolah wajib diisi'),
  jenisKelamin: z.enum(['Laki-laki', 'Perempuan']),
  noWA: z.string().min(10, 'Nomor WA wajib diisi').regex(/^[0-9]+$/, 'Nomor WA harus angka'),
  email: z.string().email('Email tidak valid').optional().or(z.literal('')),
  alamat: z.string().optional(),
  referensi: z.string().optional(),
})

export type FormState = {
  success?: boolean
  message?: string
  errors?: Record<string, string>
}

export async function daftarPPDB(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = {
    namaLengkap: formData.get('namaLengkap'),
    nisn: formData.get('nisn'),
    asalSekolah: formData.get('asalSekolah'),
    jenisKelamin: formData.get('jenisKelamin'),
    noWA: formData.get('noWA'),
    email: formData.get('email') || undefined,
    alamat: formData.get('alamat') || undefined,
    referensi: formData.get('referensi') || undefined,
  }

  const validated = ppdbSchema.safeParse(rawData)

  if (!validated.success) {
    const errors: Record<string, string> = {}
    validated.error.issues.forEach((issue) => {
      const field = issue.path[0] as string
      errors[field] = issue.message
    })
    return { success: false, message: 'Validasi gagal', errors }
  }

  try {
    await prisma.pPDB.create({
      data: {
        namaLengkap: validated.data.namaLengkap,
        nisn: validated.data.nisn,
        asalSekolah: validated.data.asalSekolah,
        jenisKelamin: validated.data.jenisKelamin,
        noWA: validated.data.noWA,
        email: validated.data.email,
        alamat: validated.data.alamat,
        referensi: validated.data.referensi || null,
        nilaiRata: null,
        JurusanPilihan: "Teknik Komputer dan Jaringan",
        status: 'PENDING',
      },
    })

    revalidatePath('/admin/ppdb')

    return { success: true, message: 'Pendaftaran berhasil! Silakan tunggu info selanjutnya via WhatsApp.' }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, message: 'NISN sudah terdaftar sebelumnya', errors: { nisn: 'NISN sudah terdaftar' } }
    }
    console.error('PPDB Error:', error)
    return { success: false, message: 'Terjadi kesalahan server. Silakan coba lagi.' }
  }
}

export async function updateStatusPPDB(id: string, status: 'PENDING' | 'DITERIMA' | 'DITOLAK') {
  try {
    await prisma.pPDB.update({
      where: { id },
      data: { status },
    })
    revalidatePath('/admin/ppdb')
    return { success: true }
  } catch (error) {
    console.error('Update Status Error:', error)
    return { success: false, message: 'Gagal memperbarui status' }
  }
}

export async function deletePPDB(id: string) {
  try {
    await prisma.pPDB.delete({
      where: { id },
    })
    revalidatePath('/admin/ppdb')
    return { success: true }
  } catch (error) {
    console.error('Delete PPDB Error:', error)
    return { success: false, message: 'Gagal menghapus data' }
  }
}