import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ImageGallery from "@/components/ui/ImageGallery";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { readFleet, readMetadata } from "@/lib/admin/dal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const meta = await readMetadata();
    const p = (meta.pages as Record<string, { title: string; description: string }>)["fleet"];
    return {
      title: p?.title || "Our Fleet - Cessna 152 Aircraft",
      description: p?.description || "Explore Skylogix Aviation's fleet of well-maintained Cessna 152 aircraft. IFR-rated trainers available at $120/hr wet at Brackett Field (KPOC).",
      alternates: { canonical: `${SITE_URL}/fleet` },
      openGraph: {
        title: p?.title || `Our Fleet | ${SITE_NAME}`,
        description: p?.description || "Well-maintained Cessna 152 aircraft for flight training at Brackett Field. $120/hr wet rate.",
        url: `${SITE_URL}/fleet`,
        images: [{ url: "/N49202/N49202_1.jpeg", width: 1200, height: 630, alt: "Skylogix Aviation Fleet" }],
      },
    };
  } catch {
    return {
      title: "Our Fleet - Cessna 152 Aircraft",
      description: "Explore Skylogix Aviation's fleet of well-maintained Cessna 152 aircraft. IFR-rated trainers available at $120/hr wet at Brackett Field (KPOC).",
      alternates: { canonical: `${SITE_URL}/fleet` },
      openGraph: {
        title: `Our Fleet | ${SITE_NAME}`,
        description: "Well-maintained Cessna 152 aircraft for flight training at Brackett Field.",
        url: `${SITE_URL}/fleet`,
        images: [{ url: "/N49202/N49202_1.jpeg", width: 1200, height: 630, alt: "Skylogix Aviation Fleet" }],
      },
    };
  }
}

export default async function FleetPage() {
  const fleet = await readFleet().catch(() => []);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Our Fleet", url: `${SITE_URL}/fleet` },
        ]}
      />
      {/* Page Header */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <Image src="/landing_Image.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-900/60" />
        <Container className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Our Fleet</h1>
          <p className="text-white/80 text-lg mt-4 max-w-lg">
            Well-maintained Cessna 152 aircraft ready for your training journey.
          </p>
        </Container>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="space-y-16">
            {fleet.map((plane, i) => (
              <div
                key={plane.id}
                className={`flex flex-col ${
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                <div className="w-full lg:w-1/2">
                  <ImageGallery images={plane.images} alt={plane.name} />
                </div>
                <div className="w-full lg:w-1/2 space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-navy-900 font-[family-name:var(--font-winky)]">
                    {plane.name}
                  </h2>
                  <p className="text-gray-500 text-lg">{plane.year} {plane.model}</p>

                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Engine</p>
                      <p className="text-navy-900 font-semibold mt-1">{plane.engine}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Horsepower</p>
                      <p className="text-navy-900 font-semibold mt-1">{plane.horsepower} HP</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Flight Rule</p>
                      <p className="text-navy-900 font-semibold mt-1">{plane.flightRule}</p>
                    </div>
                    <div className="bg-gold-100 rounded-xl p-4">
                      <p className="text-xs text-gold-600 uppercase tracking-wider">Rate</p>
                      <p className="text-gold-600 font-bold mt-1 text-lg">{plane.pricePerHour}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{plane.description}</p>

                  <Link
                    href={`/fleet/${plane.id}`}
                    className="inline-flex items-center gap-2 text-navy-500 font-medium hover:text-gold-500 transition-colors mt-2"
                  >
                    View Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
