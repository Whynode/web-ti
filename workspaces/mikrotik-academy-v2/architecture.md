# Technical Specification: Mikrotik Academy V2

**Version:** 1.0  
**Date:** 2026-04-09  
**Status:** Approved for Implementation  
**Target File:** `src/app/program/mikrotik/page.tsx`

---

## 1. Project Overview

### 1.1 Purpose
Overhaul halaman Mikrotik Academy dengan layout baru berisi 6 section: Hero, Sambutan Kepala Sekolah, Tentang Mikrotik Academy, Sertifikat, Kurikulum MTCNA Grid, dan Profil Instruktur.

### 1.2 Technology Stack
| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3.x |
| Animation | Framer Motion |
| Icons | Lucide React |
| Image Component | next/image |

### 1.3 Brand Color Palette
```css
--brand-navy: #0B1120 (primary dark background)
--brand-pink-start: #e85aa4 (accent/CTA)
--brand-blue-start: #3b82f6 (secondary accent)
```

---

## 2. Section Breakdown

### 2.1 Section 1: Hero Banner
**Position:** Top of page  
**Layout:** Full-width, min-height 600px desktop

| Element | Content | Style |
|---------|---------|-------|
| Title | "Mikrotik Academy" | text-4xl lg:text-[3.5rem], font-bold, white |
| Subtitle | "SMK Swasta Pertama di Indramayu dengan lisensi resmi untuk mencetak Network Engineer berstandar global." | text-sm lg:text-base, text-white/70 |
| CTA Button | "Daftar PPDB" → Link to `/ppdb` | brand-pink-start bg, white text |

**Responsive Breakpoints:**
- Mobile: Stacked, padding 24px
- Desktop: Content left-aligned, padding 48px

### 2.2 Section 2: Sambutan Kepala Sekolah
**Position:** Below Hero  
**Layout:** Flexbox - photo left, text right

| Element | Content | Style |
|---------|---------|-------|
| Photo Placeholder | div bg-gray-200 + "Gambar akan diisi manual" | w-16 h-16 lg:w-20 lg:h-20 rounded-full |
| Name | "Nama Kepala Sekolah" | text-white font-semibold text-base lg:text-lg |
| Institution | "SMKS Telematika Indramayu" | text-white/50 text-xs |
| Welcome Text | Sambutan dari kepala sekolah | text-white/70 text-xs lg:text-sm |

**Background:** bg-white/5 with backdrop-blur, border white/10, rounded-2xl

### 2.3 Section 3: Tentang Mikrotik Academy
**Position:** Below Sambutan  
**Layout:** Text block with heading and paragraphs

| Element | Content |
|---------|---------|
| Section Title | "Tentang Mikrotik Academy" |
| Description | Penjelasan panjang tentang: |
| | - Apa itu Mikrotik Academy |
| | - Sistem pembelajaran |
| | - Keuntungan sertifikasi internasional |

**Background:** bg-slate-50 with grid pattern (bg-grid-light)

### 2.4 Section 4: Sertifikat Mikrotik
**Position:** Below Tentang  
**Layout:** Centered container

| Element | Content | Style |
|---------|---------|-------|
| Image Placeholder | div bg-gray-200 + "Gambar akan diisi manual" | max-w-md, centered |
| Source | Folder `public/mik-cer` | Placeholder only - no actual image |

**Background:** bg-slate-50 (continuation from section 3)

### 2.5 Section 5: Kurikulum MTCNA Grid
**Position:** Below Sertifikat  
**Layout:** CSS Grid - responsive

**9 Modules:**

| No | Module Title | Description |
|----|--------------|-------------|
| 1 | Initial Configuration | RouterOS installation, basic configuration, identity setup |
| 2 | DHCP | DHCP server setup, lease management, DHCP client |
| 3 | Bridging | Bridge setup, bridge filtering, transparent bridging |
| 4 | Routing | Static routing, RIP, OSPF configuration |
| 5 | Wireless | WiFi configuration, AP/Station mode, security |
| 6 | Firewall | Filter rules, NAT, address lists |
| 7 | QoS | Queue types, bandwidth management, traffic shaping |
| 8 | Tunnels | PPTP, L2TP, IPsec tunneling |
| 9 | Misc Tools | Tools overview, monitoring, backup/restore |

**Grid Configuration:**
```css
grid-cols-1 (mobile)
grid-cols-2 (tablet: sm)
grid-cols-3 (desktop: lg)
```

**Card Style:** bg-white/5, border white/10, rounded-xl, hover effects

**Background:** bg-[#0B1120] with grid pattern (bg-grid-dark)

### 2.6 Section 6: Profil Instruktur
**Position:** Below Kurikulum  
**Layout:** Flexbox - photo/info left, certificates right

| Element | Content | Style |
|---------|---------|-------|
| Photo Placeholder | div bg-gray-200 + "Gambar akan diisi manual" | w-40 h-40 lg:w-48 lg:h-48 rounded-2xl |
| Name | "Nama Instruktur" | text-xl lg:text-2xl font-bold |
| Badge 1 | MTCNA | brand-pink-start badge |
| Badge 2 | MTCRE | brand-blue-start badge |
| Description | Deskripsi singkat instruktur | text-slate-600 text-sm |
| Certificate Frame 1 | div bg-gray-200 + "Gambar akan diisi manual" | bingkai sertifikat placeholder |
| Certificate Frame 2 | div bg-gray-200 + "Gambar akan diisi manual" | bingkai sertifikat placeholder |

**Background:** bg-slate-50

---

## 3. Component Specifications

### 3.1 Placeholder Image Component
```tsx
<div className="bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
  Gambar akan diisi manual
</div>
```

**Usage:**
- Section 2: Photo kepala sekolah (rounded-full, 80x80px)
- Section 4: Sertifikat Mikrotik (max-w-md, centered)
- Section 6: Photo instruktur (rounded-2xl, 160x160px)
- Section 6: 2 bingkai sertifikat (squares, 100x100px each)

### 3.2 Animation Configuration
```tsx
// Fade In Up
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Stagger Container
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

**Trigger:** `whileInView` with `viewport={{ once: true }}`

---

## 4. Responsive Design Specification

### 4.1 Breakpoints
| Breakpoint | Width | Grid Columns | Font Sizes |
|------------|-------|--------------|------------|
| Mobile | < 640px | 1 | text-base |
| Tablet | 640px - 1024px | 2 | text-base |
| Desktop | > 1024px | 3 | text-lg |

### 4.2 Padding Scale
| Element | Mobile | Desktop |
|---------|--------|---------|
| Section Padding | px-6 py-16 | lg:px-12 lg:py-20 |
| Container Max-Width | max-w-7xl | max-w-7xl |
| Card Padding | p-4 | lg:p-6 |

---

## 5. Implementation Order

### Phase 1: Structure & Hero
1. Create SectionContainer component
2. Build Hero section with title, subtitle, CTA

### Phase 2: Sambutan & Tentang
3. Create PlaceholderImage component (reusable)
4. Build PrincipalGreeting section
5. Build AboutSection with text content

### Phase 3: Sertifikat & Modul
6. Build CertificatePlaceholder section
7. Create ModuleCard component with list
8. Build ModuleGrid with 9 modules

### Phase 4: Profil Instruktur
9. Build InstructorProfile section
10. Integrate all placeholder images

### Phase 5: Finishing
11. Global styling consistency check
12. Animation timing adjustment
13. Cross-browser testing

---

## 6. File Structure

```
src/app/program/mikrotik/
├── page.tsx                    # Main page (overhaul target)
└── components/
    ├── HeroSection.tsx         # Section 1
    ├── PrincipalGreeting.tsx   # Section 2
    ├── AboutSection.tsx        # Section 3
    ├── CertificateShowcase.tsx # Section 4
    ├── CurriculumGrid.tsx      # Section 5
    └── InstructorProfile.tsx   # Section 6
```

---

## 7. Acceptance Criteria

- [ ] All 6 sections implemented in correct order
- [ ] All images replaced with placeholder divs (bg-gray-200 + text)
- [ ] No external images from internet
- [ ] Responsive across mobile, tablet, desktop
- [ ] Framer Motion animations working
- [ ] Brand colors (navy, pink-start, blue-start) applied
- [ ] CTA button links to /ppdb
- [ ] 9 curriculum modules displayed with descriptions
- [ ] Instructor profile has 2 certificate placeholders

---

## 8. Open Questions

1. **Hero Subtitle:** Need final copy for hero subtitle
2. **Sambutan Text:** Need complete welcome message from principal
3. **About Section:** Need full description text for Mikrotik Academy
4. **Module Descriptions:** Need detailed descriptions for all 9 modules
5. **Instructor Details:** Need actual name and bio for instructor

---

## 9. Related Artifacts

- **Plan:** `workspaces/mikrotik-academy-v2/plan.md`
- **Current Implementation:** `src/app/program/mikrotik/page.tsx`
- **Assets Folder:** `public/mik-cer/` (for certificate images)

---

*Document prepared by: architect*  
*Next Step: Implementation by backend-developer*