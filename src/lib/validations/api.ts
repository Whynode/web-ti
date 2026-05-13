// Centralized Zod validation schemas for all API routes
import { z } from "zod";

// ============================================================================
// SHARED VALIDATORS
// ============================================================================

export const idParamsSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
});

// URL validation - strict for security
export const urlSchema = z.string().url("Invalid URL format").optional().or(z.literal(""));

// ============================================================================
// ARTIKEL / BLOG SCHEMAS
// ============================================================================

export const artikelSchema = z.object({
  judul: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  konten: z.string().min(1).max(50000), // Limit to prevent XSS
  thumbnailUrl: urlSchema,
  kategori: z.string().max(50).default("Umum"),
  isPinned: z.boolean().default(false),
});

export const artikelUpdateSchema = artikelSchema.partial();

export const likeSchema = z.object({
  artikelId: z.string().uuid("Invalid artikel ID"),
});

// ============================================================================
// KOMENTAR SCHEMAS
// ============================================================================

export const komentarSchema = z.object({
  nama: z.string().max(100).default("Anonim"),
  isi: z.string().min(1).max(2000), // Prevent XSS payload
  blogId: z.string().uuid("Invalid blog ID"),
  parentId: z.string().uuid("Invalid parent ID").optional().or(z.literal("")),
});

// ============================================================================
// GALERI SCHEMAS
// ============================================================================

export const galeriSchema = z.object({
  judul: z.string().min(1).max(200),
  kategori: z.string().min(1).max(50),
  imageUrl: z.string().url("Invalid image URL"),
});

export const galeriUpdateSchema = galeriSchema.partial();

// ============================================================================
// BKK MITRA INDUSTRI SCHEMAS
// ============================================================================

export const mitraSchema = z.object({
  namaPerusahaan: z.string().min(1).max(200),
  logoUrl: urlSchema,
  websiteUrl: urlSchema,
});

export const mitraUpdateSchema = mitraSchema.partial();

// ============================================================================
// BKK LOWONGAN KERJA SCHEMAS
// ============================================================================

export const lowonganSchema = z.object({
  judul: z.string().min(1).max(200),
  tipePekerjaan: z.string().max(50).default("Full-Time"),
  lokasi: z.string().max(100).default(""),
  deskripsi: z.string().max(10000).default(""), // Limit to prevent payload
  posterUrl: urlSchema,
  status: z.string().max(20).default("BUKA"),
  mitraId: z.string().uuid("Invalid mitra ID"),
});

export const lowonganUpdateSchema = lowonganSchema.partial();

// ============================================================================
// BKK PENEMPATAN ALUMNI SCHEMAS
// ============================================================================

export const penempatanSchema = z.object({
  namaAlumni: z.string().min(1).max(200),
  tahunLulus: z.number().min(2000).max(2030),
  perusahaanTempatKerja: z.string().min(1).max(200),
});

export const penempatanUpdateSchema = penempatanSchema.partial();

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ArtikelInput = z.infer<typeof artikelSchema>;
export type KomentarInput = z.infer<typeof komentarSchema>;
export type GaleriInput = z.infer<typeof galeriSchema>;
export type MitraInput = z.infer<typeof mitraSchema>;
export type LowonganInput = z.infer<typeof lowonganSchema>;
export type PenempatanInput = z.infer<typeof penempatanSchema>;

// Validation error response helper
export function formatZodError(error: z.ZodError) {
  const issues: Record<string, string> = {};
  error.issues.forEach((issue) => {
    const path = issue.path.join(".");
    issues[path] = issue.message;
  });
  return issues;
}