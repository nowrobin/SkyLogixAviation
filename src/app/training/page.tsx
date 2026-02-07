import type { Metadata } from "next";
import TrainingContent from "./_components/TrainingContent";
import { FlightSchoolJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Become A Pilot - Flight Training Programs",
  description:
    "Your step-by-step guide from Private Pilot License (PPL) to Airline Transport Pilot (ATP). Learn about requirements, flight hours, and costs for each certification at Skylogix Aviation.",
  alternates: {
    canonical: `${SITE_URL}/training`,
  },
  openGraph: {
    title: "Become A Pilot | Skylogix Aviation",
    description:
      "From PPL to ATP — your complete pilot training roadmap. Start your aviation career at Brackett Field.",
    url: `${SITE_URL}/training`,
    images: [{ url: "/plane_image.jpg", width: 1200, height: 630, alt: "Pilot Training Programs" }],
  },
};

export default function TrainingPage() {
  return (
    <>
      <FlightSchoolJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Become A Pilot", url: `${SITE_URL}/training` },
        ]}
      />
      <TrainingContent />
    </>
  );
}
