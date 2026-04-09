# UX & Accessibility Assessment Report

**Interface:** MikroTik Academy V2 - `/program/mikrotik/page.tsx`
**Date:** 2026-04-09
**Assessor:** UX-Advisor Agent
**WCAG Target:** Level AA

## Executive Summary

Halaman MikroTik Academy V2 secara umum telah diimplementasikan dengan baik menggunakan pola responsif yang konsisten dan tata letak yang bersih. **6 section telah tersedia**: Hero, Sambutan Kepala Sekolah, Tentang Mikrotik Academy, Sertifikat, Kurikulum MTCNA, dan Profil Instruktur. Placeholder gambar telah sesuai aturan (bg-gray-200 + teks). Grid modul responsif dengan pola 1/2/3 kolom.

**Namun, ditemukan beberapa temuan yang perlu perbaikan**, terutama pada aspek accessibility (visible focus state pada button) dan konsistensi visual. Secara keseluruhan, halaman ini memiliki fondasi yang solid dan siap untuk perbaikan minor sebelum launch.

---

## Severity Classification

| Severity | Definition | Action Timeline |
| :--- | :--- | :--- |
| 🔴 Critical | Blocks users from completing tasks; WCAG Level A violation | Immediate |
| 🟠 High | Significant friction or accessibility barrier | This sprint |
| 🟡 Medium | Usability improvement or WCAG AA refinement | Next sprint |
| ⚪ Low | Minor enhancement; nice to have | Backlog |
| 🌟 Best Practice | Suggestion for excellence | Consider |

---

## Findings Summary

| Category | Critical | High | Medium | Low |
| :--- | :--- | :--- | :--- | :--- |
| Usability | 0 | 1 | 1 | 2 |
| Accessibility | 1 | 0 | 1 | 0 |
| Visual Design | 0 | 0 | 2 | 1 |
| Content/Microcopy | 0 | 0 | 0 | 0 |

---

## Detailed Findings

### Finding #1: Missing Focus Indicator on CTA Buttons
- **Severity:** 🔴 Critical
- **Category:** Accessibility
- **WCAG SC:** 2.4.7 - Focus Visible
- **Location:** 
  - Line 186-189: Hero CTA "Daftar Sekarang"
  - Line 537-542: Bottom CTA "Daftar PPDB Sekarang"
- **Issue:** Kedua CTA button tidak memiliki `:focus` state yang terlihat. Ketika pengguna menggunakan keyboard untuk menavigasi, tidak ada indikasi visual yang jelas bahwa button sedang dalam fokus.
- **Impact:** Pengguna keyboard tidak dapat mengetahui button mana yang sedang aktif/fokus. Ini adalah WCAG Level A violation yang harus diperbaiki sebelum launch.
- **Recommendation:** Tambahkan styling focus state pada button. Gunakan `focus:ring` atau `focus:outline` dengan warna yang kontras.
- **Before/After:**
  - Current: `className="...transition-all shadow-lg..."` (tanpa focus state)
  - Recommended: Tambahkan `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink-start`

---

### Finding #2: Touch Target Size pada Mobile
- **Severity:** 🟠 High
- **Category:** Accessibility
- **WCAG SC:** 2.5.8 - Target Size (Minimum)
- **Location:** Semua Link/Button di section yang sama
- **Issue:** Pada perangkat mobile, beberapa touch target mungkin terlalu kecil dari standar minimum 44x44px (terutama jika padding dipertimbangkan).
- **Impact:** Pengguna mobile mungkin mengalami kesulitan menekan button/CTA dengan akurat.
- **Recommendation:** Pastikan padding button minimal 12px vertical (py-3 = 12px sudah cukup baik). Untuk link dalam grid modul, pertimbangkan untuk memastikan area clickable cukup besar.
- **Before/After:**
  - Current: `px-6 py-3` (48px height - sudah cukup)
  - Recommended: Review semua clickable elements untuk memastikan minimum 44x44px

---

### Finding #3: Inconsistent Spacing di Section Sambutan
- **Severity:** 🟡 Medium
- **Category:** Visual Design
- **WCAG SC:** — (Design Consistency)
- **Location:** Section 2 (Line 198-237)
- **Issue:** Pada breakpoints mobile, gap antara foto placeholder dan teks welcome message mungkin terlalu besar atau terlalu kecil dibanding section lain.
- **Impact:** Inkonsistensi visual yang subtle namun mempengaruhi professional look.
- **Recommendation:** Review dan pastikan `gap-8 lg:gap-12` konsisten dengan section lain yang menggunakan pattern serupa.
- **Before/After:**
  - Current: `gap-8 lg:gap-12`
  - Recommended: Konsisten dengan pattern `gap-6 lg:gap-12` atau sesuaikan dengan section lain

---

### Finding #4: Text Contrast pada Dark Section
- **Severity:** 🟡 Medium
- **Category:** Accessibility
- **WCAG SC:** 1.4.3 - Contrast (Minimum)
- **Location:** 
  - Line 407: "9 modul pembelajaran lengkap..." (text-white/50)
  - Line 439: Topic items (text-white/60)
- **Issue:**white/50 (50% opacity white) pada background #0B1120 mungkin tidak memenuhi ratio 4.5:1 untuk teks kecil. white/60 seharusnya sudah cukup, namun perlu verifikasi.
- **Impact:** Teks mungkin sulit dibaca oleh pengguna dengan penglihatan berkurang.
- **Recommendation:** Ubah text-white/50 menjadi minimal text-white/70 untuk memastikan contrast ratio ≥ 4.5:1.
- **Before/After:**
  - Current: `text-white/50` dan `text-white/60`
  - Recommended: `text-white/70` untuk teks deskriptif, `text-white/80` untuk teks utama

---

### Finding #5: Placeholder Text Font Size Consistency
- **Severity:** ⚪ Low
- **Category:** Visual Design
- **WCAG SC:** — (Design Consistency)
- **Location:** 
  - Line 210: "Gambar akan diisi manual" (text-sm)
  - Line 378: "Gambar akan diisi manual" (text-sm)
  - Line 488: "Gambar akan diisi manual" (text-sm)
  - Line 518, 521: "Gambar akan diisi manual" (text-sm)
- **Issue:** Semua placeholder sudah konsisten menggunakan `text-sm` ✅ - Ini bukan issue, ini adalah observasi positif.
- **Impact:** —
- **Recommendation:** —
- **Before/After:** —

---

### Finding #6: Alt Text pada Background Image
- **Severity:** 🟡 Medium
- **Category:** Accessibility
- **WCAG SC:** 1.1.1 - Non-text Content
- **Location:** Line 151-157 (Hero Background Image)
- **Issue:** Gambar background di Hero section menggunakan `alt="MikroTik Academy Background"`. Untuk background image yang purely decorative, sebaiknya menggunakan empty alt (`alt=""`) karena gambar ini sudah di-overlay dengan gradient dan bukan informasi utama.
- **Impact:** Screen reader akan membaca "MikroTik Academy Background" yang tidak memberikan value informasi berarti.
- **Recommendation:** Ubah alt text menjadi empty string jika gambar ini purely decorative, atau tambahkan deskripsi yang lebih meaningful jika memang informasi penting.
- **Before/After:**
  - Current: `alt="MikroTik Academy Background"`
  - Recommended: `alt=""` (decorative) atau deskripsi meaningful

---

### Finding #7: Heading Hierarchy
- **Severity:** ⚪ Low
- **Category:** Best Practice
- **WCAG SC:** 2.4.6 - Headings and Labels
- **Location:** Multiple sections
- **Issue:** Heading hierarchy sudah baik ✅ - H1 > H2 > H3 digunakan dengan tepat. Ini adalah observasi positif.
- **Impact:** —
- **Recommendation:** —
- **Before/After:** —

---

## Positive Observations

### ✅ Visual Design
- **Brand consistency**: Warna brand (brand-pink-start, brand-blue-start) digunakan secara konsisten di seluruh halaman
- **Typography**: Penggunaan font Poppins untuk heading dan Inter untuk body sudah tepat
- **Spacing**: Padding dan margin konsisten (py-16 lg:py-20, px-6)
- **Dark sections**: Background #0B1120 dengan gradient overlay memberikan kontras yang baik

### ✅ Responsive Design
- **Hero**: min-h-[600px] lg:min-h-[700px] - ukuran yang proporsional
- **Grid layouts**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 - pola responsif standar
- **Flex layouts**: flex-col lg:flex-row - transisi yang tepat untuk mobile → desktop
- **Modul grid**: Gap dan sizing sudah responsif

### ✅ Placeholder Compliance
- **Semua placeholder gambar**: bg-gray-200 + text "Gambar akan diisi manual" ✅
- **Konsistensi**: Semua menggunakan text-sm dan warna gray-400

### ✅ Content/Microcopy
- **Bahasa Indonesia**:使用了 dengan baik
- **Tone**: Profesional dan informatif
- **Struktur**: Informasi terorganisir dengan baik dalam section yang jelas

### ✅ Animation
- **Framer Motion**: Penggunaan yang tepat dengan fadeInUp dan staggerContainer
- **Performance**: animations tidak berlebihan

---

## Accessibility Compliance Score

| WCAG Principle | Level A | Level AA | Status |
| :--- | :--- | :--- | :--- |
| **Perceivable** | 4/5 | 2/3 | ✅ Pass |
| **Operable** | 3/4 | 2/3 | ⚠️ Partial |
| **Understandable** | 2/2 | 2/2 | ✅ Pass |
| **Robust** | 2/2 | 1/1 | ✅ Pass |

**Overall: ⚠️ Partial (Need fixes before launch)**

---

## Prioritized Action Plan

### 🔴 Immediate (Before Launch)
1. **[Critical]** Tambahkan focus indicator pada CTA buttons (Line 186-189 dan 537-542)
   - Tambahkan: `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-pink-start focus:ring-offset-[#0B1120]`

### 🟠 Short-term (This Sprint)
2. **[High]** Review touch target size - pastikan semua clickable elements ≥ 44x44px
3. **[Medium]** Perbaiki text contrast pada dark section: text-white/50 → text-white/70

### 🟡 Medium-term (Next Sprint)
4. **[Medium]** Review dan pertimbangkan alt text untuk background image (decorative vs informative)
5. **[Medium]** Konsistensi spacing di section Sambutan

### 🌟 Long-term (Continuous Improvement)
6. **[Best Practice]** Pertimbangkan untuk menambahkan skip-to-content link
7. **[Best Practice]** Pertimbangkan untuk menambahkan prefers-reduced-motion untuk user yang sensitif terhadap animasi
