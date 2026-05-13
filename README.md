This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

# Architecture & Security Guidelines (MANDATORY)

This section documents the hardened architecture standards for this codebase. All developers MUST follow these rules to maintain security and type safety.

## 1. Database Schema Standards

### Primary Keys - UUID ONLY

**RULE**: ALL database models MUST use UUID as the primary key type. NEVER use auto-increment integers.

```prisma
// ✅ CORRECT
model Guru {
  id String @id @default(uuid()) @db.Uuid
  ...
}

// ❌ FORBIDDEN
model Guru {
  id Int @id @default(autoincrement())
  ...
}
```

- All 13 tables have been migrated to UUID: `User`, `Guru`, `Kelas`, `Siswa`, `MateriElearning`, `ArtikelBlog`, `LowonganKerja`, `PenempatanAlumni`, `PPDB`

### Foreign Keys

**RULE**: All foreign keys MUST match the referenced primary key type (`@db.Uuid`).

```prisma
// ✅ CORRECT
model Kelas {
  waliKelasId String? @map("wali_kelas_id") @db.Uuid
  ...
}

// ❌ FORBIDDEN - Type mismatch causes migration failures
model Kelas {
  waliKelasId Int? @map("wali_kelas_id")
  ...
}
```

## 2. API Route Security

### Zod Validation - MANDATORY

**RULE**: ALL API routes MUST use Zod schemas for payload validation. NEVER use manual type checking.

```typescript
// ✅ CORRECT - src/app/api/galeri/route.ts
import { galeriSchema } from "@/lib/validations/api";

const validated = galeriSchema.safeParse(body);
if (!validated.success) {
  return NextResponse.json({ error: "Validation failed" }, { status: 400 });
}
```

```typescript
// ❌ FORBIDDEN
const { judul, kategori } = body;
if (!judul || !kategori) {
  return NextResponse.json({ error: "Missing fields" }, { status: 400 });
}
```

- Centralized schemas: `src/lib/validations/api.ts`
- ALL 11 API routes have been refactored with Zod

### Admin Authentication - MANDATORY

**RULE**: ALL protected API routes MUST verify the `admin_session` cookie.

```typescript
// ✅ CORRECT
import { requireAdmin } from "@/lib/auth/server";

export async function POST(request: Request) {
  await requireAdmin(); // Throws 401 if not authenticated
  // ... proceed with handler
}
```

- Auth utility: `src/lib/auth/server.ts`

## 3. Environment Variables

**RULE**: NO hardcoded secrets permitted anywhere in the codebase.

```typescript
// ✅ CORRECT
const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;

// ❌ FORBIDDEN
const DEFAULT_PASSWORD = "ADMINtelindra17";
```

Required env variables:
- `DEFAULT_ADMIN_PASSWORD` - Admin password (login/actions.ts)
- `NEXT_PUBLIC_SUPABASE_PROJECT_ID` - Supabase project (middleware.ts)
- Database credentials (`DATABASE_URL`, etc.)

## 4. Build Stability

**RULE**: Admin pages with database queries MUST use `force-dynamic`.

```typescript
// ✅ CORRECT
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const data = await prisma.guru.findMany();
  // ...
}
```

- Applied to all 8+ admin data pages to prevent static generation database timeouts

## 5. Frontend Type Safety

**RULE**: ALL TypeScript interfaces MUST use `string` for IDs (UUIDs), NOT `number`.

```typescript
// ✅ CORRECT
interface Guru {
  id: string;
  nama: string;
}

// ❌ FORBIDDEN
interface Guru {
  id: number;
  nama: string;
}
```

```typescript
// ✅ CORRECT - No parseInt/Number conversion needed
const guru = await prisma.guru.findUnique({ where: { id } });
// id is already string (UUID)

// ❌ FORBIDDEN
const guru = await prisma.guru.findUnique({ where: { id: parseInt(id) } });
```

## 6. Build Verification

Before deploying, run:

```bash
# Type check (must pass with ZERO errors)
npx tsc --noEmit

# Production build
npm run build
```

---

## Quick Reference

| Standard | Location |
|----------|-----------|
| Zod schemas | `src/lib/validations/api.ts` |
| Auth utility | `src/lib/auth/server.ts` |
| Prisma schema | `prisma/schema.prisma` |
| Admin actions | `src/app/admin/*/actions.ts` |
| API routes | `src/app/api/**/route.ts` |

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
