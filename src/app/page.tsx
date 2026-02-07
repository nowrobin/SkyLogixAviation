import type { Metadata } from "next";
import HomeContent from "./_components/HomeContent";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Learn to Fly at Brackett Field (KPOC)`,
  description:
    "Learn to fly in a way that is quick, easy, and efficient. Affordable Cessna 152 flight training at Brackett Field (KPOC) in La Verne, CA. Aircraft at $120/hr, instruction at $55/hr.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | Learn to Fly`,
    description:
      "Your aviation dreams take flight here. High-quality, affordable flight training at Brackett Field.",
    url: SITE_URL,
    images: [{ url: "/landing_Image.png", width: 1200, height: 630, alt: "Skylogix Aviation" }],
  },
};

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomeContent />
    </>
  );
}
