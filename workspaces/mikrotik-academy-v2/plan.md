# Rencana Overhaul: Mikrotik Academy V2 (Layout Baru)

**Versi:** 1.0  
**Dibuat:** 2026-04-09  
**Status:** Draft - Siap Implementasi

---

## 1. Struktur 6 Section (Urutan从上到下)

### 1.1 Section Hero / Tampilan Awal
- **Tipe:** Banner utama full-width
- **Elemen:**
  - Judul utama: "Mikrotik Academy"
  - Subjudul menarik (belum ditentukan具体的文案)
  - Tombol CTA: "Daftar PPDB" → link ke halaman PPDB
- **Catatan:** TIDAK ada sambutan kepala sekolah di section ini
- **Status Placeholder:** Tidak ada gambar, hanya komponen teks dan tombol

### 1.2 Section Sambutan Kepala Sekolah
- **Posisi:** Di bawah Hero
- **Elemen:**
  - Foto kepala sekolah: **KOSONGKAN** (div abu-abu + teks "Gambar akan diisi manual")
  - Teks sambut: "Kebanggaan SMKS Telematika Indramayu menjadi mitra resmi Mikrotik Academy"
- **Layout:** Flexbox - foto di kiri/kiri, teks di kanan

### 1.3 Section Tentang Mikrotik Academy
- **Posisi:** Di bawah Sambutan Kepala Sekolah
- **Elemen:**
  - Judul section
  - Penjelasan panjang tentang:
    - Apa itu Mikrotik Academy
    - Sistem pembelajaran
    - Keuntungan sertifikasi internasional
- **Layout:** Text block dengan heading dan paragraf

### 1.4 Section Sertifikat Mikrotik (Placeholder Gambar)
- **Posisi:** Di bawah Tentang Mikrotik Academy
- **Elemen:**
  - Placeholder gambar sertifikat: **KOSONGKAN**
  - Div dengan background abu-abu muda + teks "Gambar akan diisi manual"
  - Sumber: folder `public/mik-cer` (belum ada gambar)
- **Layout:** Centered container untuk sertifikat

### 1.5 Section Kurikulum MTCNA (Grid Modul)
- **Posisi:** Di bawah Sertifikat
- **Elemen:** 9 modul dalam grid (3x3 atau responsif)
  1. **Modul 1: Initial Configuration** - Penjelasan singkat
  2. **Modul 2: DHCP** - Penjelasan singkat
  3. **Modul 3: Bridging** - Penjelasan singkat
  4. **Modul 4: Routing** - Penjelasan singkat
  5. **Modul 5: Wireless** - Penjelasan singkat
  6. **Modul 6: Firewall** - Penjelasan singkat
  7. **Modul 7: QoS** - Penjelasan singkat
  8. **Modul 8: Tunnels** - Penjelasan singkat
  9. **Modul 9: Misc Tools** - Penjelasan singkat
- **Catatan:** Setiap card HARUS ada list penjelasan singkat (bukan hanya judul)
- **Layout:** CSS Grid - responsive (1 kolom mobile, 2 tablet, 3 desktop)

### 1.6 Section Profil Instruktur
- **Posisi:** Di bawah Modul Kurikulum
- **Elemen:**
  - Foto instruktur: **KOSONGKAN** (div abu-abu + teks "Gambar akan diisi manual")
  - Nama: "Nama Instruktur" (placeholder)
  - Badge: "MTCNA & MTCRE"
  - 2 bingkai sertifikat: **KOSONGKAN** (div abu-abu + teks "Gambar akan diisi manual")
- **Layout:** Flexbox horizontal - foto + info di kiri, sertifikat di kanan

---

## 2. Komponen yang Perlu Dibuat

### Komponen Shared/Reusable
| Komponen | Deskripsi |
|----------|-----------|
| SectionContainer | Wrapper untuk setiap section dengan padding |
| PlaceholderImage | Komponen reusable untuk gambar placeholder |
| Button | Tombol CTA (primary style) |
| Card | Card untuk modul kurikulum |
| SectionHeading | Judul section dengan styling konsisten |

### Komponen Spesifik per Section
| Section | Komponen Khusus |
|---------|-----------------|
| Hero | HeroBanner (title, subtitle, CTA button) |
| Sambutan Kepala Sekolah | PrincipalGreeting (photo placeholder + text) |
| Tentang Mikrotik Academy | AboutSection (long text content) |
| Sertifikat | CertificatePlaceholder (image placeholder) |
| Kurikulum MTCNA | ModuleGrid + ModuleCard (9 items) |
| Profil Instruktur | InstructorProfile (photo + name + badge + cert frames) |

---

## 3. Urutan Implementasi (Prioritas)

### Fase 1: Struktur Dasar & Hero
1. Buat SectionContainer component
2. Buat Hero section dengan title, subtitle, dan tombol CTA ke PPDB
3. Styling responsif untuk Hero

### Fase 2: Sambutan & Tentang
4. Buat PlaceholderImage component (reusable)
5. Buat PrincipalGreeting section dengan foto placeholder + teks
6. Buat AboutSection dengan penjelasan panjang

### Fase 3: Sertifikat & Modul
7. Buat CertificatePlaceholder section
8. Buat ModuleCard component (dengan list penjelasan)
9. Buat ModuleGrid dengan 9 modul
10. Styling grid responsif

### Fase 4: Profil Instruktur
11. Buat InstructorProfile section
12. Integrasi semua placeholder gambar

### Fase 5: Finishing
13. Styling dan formatting keseluruhan
14. Review konsistensi design
15. Testing responsif di berbagai breakpoint

---

## 4. Aturan Placeholder Gambar

**PENTING:** Semua foto dan gambar menggunakan placeholder dengan ketentuan:
- Element: `<div>` dengan background warna abu-abu muda (#E0E0E0 atau similar)
- Text di dalam: "Gambar akan diisi manual"
- Style: centered text, padding yang cukup
- TIDAK menggunakan gambar dummy dari internet

**Daftar gambar yang perlu placeholder:**
1. Foto kepala sekolah (Section 1.2)
2. Gambar sertifikat (Section 1.4)
3. Foto instruktur (Section 1.6)
4. 2 bingkai sertifikat instruktur (Section 1.6)

---

## 5. Asumsi & Pertanyaan Terbuka

### Asumsi:
1. User sudah memiliki layout existing yang akan di-overhaul
2. Button CTA "Daftar PPDB" sudah ada link tujuannya
3. Framework yang digunakan sama dengan versi sebelumnya (belum terkonfirmasi)

### Pertanyaan untuk Klien:
1. Subjudul yang menarik untuk Hero section - ada preferensi?
2. Penjelasan lengkap untuk section "Tentang Mikrotik Academy" - sudah ada draft?
3. Detail penjelasan untuk masing-masing 9 modul - ada daftar materi spesifik?
4. Apakah ada instruktur lain yang perlu ditampilkan selain satu profil?

---

## 6. Estimasi Effort

| Fase | Task | Estimasi |
|------|------|----------|
| Fase 1 | Struktur Dasar & Hero | Medium |
| Fase 2 | Sambutan & Tentang | Small |
| Fase 3 | Sertifikat & Modul | Medium |
| Fase 4 | Profil Instruktur | Small |
| Fase 5 | Finishing | Small |

**Total estimated effort:** ~1 sprint (tergantung kompleksitas desain)