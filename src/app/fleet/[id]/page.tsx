import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ImageGallery from "@/components/ui/ImageGallery";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { fleet } from "@/data/fleet";

export function generateStaticParams() {
  return fleet.map((plane) => ({ id: plane.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const plane = fleet.find((p) => p.id === id);
  if (!plane) return {};

  return {
    title: `${plane.name} - ${plane.year} ${plane.model}`,
    description: `${plane.year} ${plane.model} (${plane.name}) available for rent at ${plane.pricePerHour}. ${plane.engine}, ${plane.horsepower}HP, ${plane.flightRule}-rated. ${plane.description}`,
    alternates: {
      canonical: `${SITE_URL}/fleet/${plane.id}`,
    },
    openGraph: {
      title: `${plane.name} | Skylogix Aviation Fleet`,
      description: `${plane.year} ${plane.model} - ${plane.pricePerHour}. IFR-rated trainer at Brackett Field.`,
      url: `${SITE_URL}/fleet/${plane.id}`,
      images: [{ url: plane.images[0], width: 1200, height: 630, alt: `${plane.name} - ${plane.model}` }],
    },
  };
}

export default async function FleetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plane = fleet.find((p) => p.id === id);

  if (!plane) return notFound();

  return (
    <div className="pt-16 md:pt-20">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Fleet", url: `${SITE_URL}/fleet` },
          { name: plane.name, url: `${SITE_URL}/fleet/${plane.id}` },
        ]}
      />
      <section className="py-12 md:py-20 bg-white">
        <Container>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/fleet" className="hover:text-gold-500 transition-colors">Fleet</Link>
            <span>/</span>
            <span className="text-navy-900 font-medium">{plane.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <ImageGallery images={plane.images} alt={plane.name} />

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-navy-900 font-[family-name:var(--font-winky)]">
                  {plane.name}
                </h1>
                <p className="text-gray-500 text-lg mt-2">{plane.year} {plane.model}</p>
              </div>

              <div className="bg-gold-100 rounded-2xl p-6 inline-block">
                <p className="text-sm text-gold-600 font-medium">Rental Rate</p>
                <p className="text-3xl font-bold text-gold-600">{plane.pricePerHour}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-navy-900">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Engine", value: plane.engine },
                    { label: "Horsepower", value: `${plane.horsepower} HP` },
                    { label: "Flight Rule", value: plane.flightRule },
                    { label: "Year", value: String(plane.year) },
                  ].map((spec) => (
                    <div key={spec.label} className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{spec.label}</p>
                      <p className="text-navy-900 font-semibold mt-1">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{plane.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button href="/inquiries" size="lg">Book This Aircraft</Button>
                <Button href="/fleet" variant="ghost" size="lg">← Back to Fleet</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
