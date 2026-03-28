import prisma from "@/lib/prisma";
import Link from "next/link";

async function getFooterGaleri() {
  try {
    const galeri = await prisma.galeri.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    });
    return galeri;
  } catch (error) {
    console.error("Error fetching footer galeri:", error);
    return [];
  }
}

export default async function FooterGallery() {
  const galeri = await getFooterGaleri();

  if (galeri.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square rounded-[10px] overflow-hidden bg-white/5 relative hover:opacity-80 transition-opacity">
            <img
              src={`https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=200&auto=format&fit=crop&sig=${i}`}
              alt="Galeri"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {galeri.map((item) => (
        <Link href="/galeri" key={item.id} className="aspect-square rounded-[10px] overflow-hidden bg-white/5 relative hover:opacity-80 transition-opacity block">
          <img
            src={item.imageUrl}
            alt={item.judul}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
          />
        </Link>
      ))}
    </div>
  );
}
