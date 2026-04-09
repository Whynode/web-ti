# Code Review: Mikrotik Academy V2

**File Reviewed:** `src/app/program/mikrotik/page.tsx`
**Total Lines:** 550

---

## Summary by Severity

| Severity | Count | Resolved? |
| :--- | :--- | :--- |
| 🔴 Blocker | 0 | - |
| 🟠 Major | 1 | Required |
| 🟡 Minor | 2 | Optional |
| ⚪ Nitpick | 1 | Optional |
| 🌟 Praise | 3 | N/A |

---

## Key Findings

### 🔴 Blocker Issues
None.

---

### 🟠 Major Issues (Must Fix Before Merge)

#### 1. Missing `sizes` Prop on Hero Image

**Location:** `src/app/program/mikrotik/page.tsx:151-157`

**Issue:**
The hero section's `Image` component is missing the `sizes` prop. This is critical for LCP (Largest Contentful Paint) optimization.

```tsx
// Current (suboptimal):
<Image
  src="/ban-mikrotik.webp"
  alt="MikroTik Academy Background"
  fill
  className="object-cover object-right"
  priority
/>
```

**Why It Matters:**
Without the `sizes` prop, Next.js cannot properly optimize the image for different viewport sizes. The browser will download the full-sized image even on mobile devices, causing:
- Slower Largest Contentful Paint (LCP)
- Increased bandwidth usage
- Poorer Core Web Vitals scores

**Suggestion:**
```tsx
<Image
  src="/ban-mikrotik.webp"
  alt="MikroTik Academy Background"
  fill
  className="object-cover object-right"
  priority
  sizes="100vw"
/>
```

Since the background image covers the full viewport width in the hero section, `sizes="100vw"` is appropriate.

**References:**
- [Next.js Image Optimization Documentation](https://nextjs.org/docs/app/api-reference/components/image#sizes)
- [Core Web Vitals - LCP](https://web.dev/lcp/)

---

### 🟡 Minor Issues (Consider Fixing)

#### 2. Entire Page as Client Component

**Location:** `src/app/program/mikrotik/page.tsx:1`

**Issue:**
The entire page uses `'use client'` directive because of framer-motion animations. While this works, it's not the most optimal pattern in Next.js 13+.

**Why It Matters:**
- Forces the entire page to be client-rendered
- Slightly larger JavaScript bundle
- Loses some benefits of server components (SEO, initial load)

**Suggestion:**
Consider extracting animated sections into separate client components (e.g., `<HeroSection />`, `<CurriculumSection />`) and keep this page as a server component. However, this is a refactoring decision and not critical for the current implementation.

**Example Pattern:**
```tsx
// src/app/program/mikrotik/page.tsx (Server Component)
import HeroSection from '@/components/mikrotik/HeroSection';

export default function MikrotikAcademyPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* other sections */}
      </main>
    </>
  );
}

// src/components/mikrotik/HeroSection.tsx (Client Component)
'use client';
import { motion } from 'framer-motion';
// ...
```

---

#### 3. Unused Icon Imports

**Location:** `src/app/program/mikrotik/page.tsx:6-18`

**Issue:**
Some imported icons from `lucide-react` are not used in the component:
- `Wifi`, `Shield`, `Gauge`, `Lock`, `Wrench`

**Suggestion:**
Remove unused imports to keep the bundle size smaller:
```typescript
import { 
  ArrowRight, 
  Award,
  CheckCircle,
  GraduationCap,
  Server,
  Network
} from 'lucide-react';
```

---

### ⚪ Nitpick (Optional)

#### 4. Placeholder Comments for Manual Images

**Location:** Lines 209-211, 377-379, 487-488, 517-522

**Issue:**
Multiple placeholder divs with text "Gambar akan diisi manual" (Image will be filled manually).

**Suggestion:**
These are placeholder sections and acceptable for development. Consider adding a TODO comment or using a proper placeholder component for better maintainability:
```tsx
// TODO: Replace with actual images when available
// - Kepala sekolah photo (line ~209)
// - Certificate example (line ~377)
// - Instructor photo (line ~487)
```

---

### 🌟 Praise (Well-Written Code)

1. **Excellent Data Organization:** The `curriculumModules` array is properly extracted outside the component, preventing recreation on each render.

2. **Good Animation Pattern:** Animation variants (`fadeInUp`, `staggerContainer`) are defined outside the component as constants - best practice for performance.

3. **Clean Code Structure:** Clear section comments (`/* SECTION 1: HERO SECTION */`) make the 550-line file easy to navigate and maintain.

---

## What's Working Well

- ✅ **TypeScript:** No type errors; code compiles cleanly
- ✅ **Next.js Patterns:** Proper use of `next/link`, `next/image` with `priority`
- ✅ **Semantic HTML:** Good use of `<section>`, `<main>`, `<h1>`, `<h2>` elements
- ✅ **Code Organization:** Data extracted to constants; clear section separation
- ✅ **Accessibility:** Proper `alt` attributes on images; semantic structure
- ✅ **Responsive Design:** Good use of Tailwind responsive prefixes (`lg:`, `md:`)

---

## Action Items

- [ ] **Required:** Add `sizes="100vw"` prop to hero Image component (line 151-157)
- [ ] **Optional:** Remove unused icon imports (lines 6-18)
- [ ] **Optional:** Consider extracting animated sections to client components (refactoring)
- [ ] **Optional:** Add TODO comments for placeholder images

---

## Verdict

**Status:** ⚠️ Changes Requested

The code is generally well-written with good structure and organization. However, there is one **Major** issue that should be fixed before merging:

1. **Missing `sizes` prop on hero image** - This impacts Core Web Vitals (LCP) performance

Once the `sizes` prop is added, the code will be ready for merge. The other minor issues are optional improvements that can be addressed in follow-up refactoring.
