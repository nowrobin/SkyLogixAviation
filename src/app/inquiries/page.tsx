import type { Metadata } from "next";
import InquiriesContent from "./_components/InquiriesContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import { readContact, readCompany, readMetadata } from "@/lib/admin/dal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const meta = await readMetadata();
    const p = (meta.pages as Record<string, { title: string; description: string }>)["inquiries"];
    return {
      title: p?.title || "Contact Us - Flight Training Inquiries",
      description: p?.description || "Get in touch with Skylogix Aviation for flight training, scheduling, discovery flights, and program inquiries. Located at Brackett Field (KPOC), La Verne, CA.",
      alternates: { canonical: `${SITE_URL}/inquiries` },
      openGraph: {
        title: p?.title || `Contact ${SITE_NAME}`,
        description: p?.description || "Questions about flight training? Contact us at Brackett Field (KPOC).",
        url: `${SITE_URL}/inquiries`,
        images: [{ url: "/mockDesign.png", width: 1200, height: 630, alt: `Contact ${SITE_NAME}` }],
      },
    };
  } catch {
    return {
      title: "Contact Us - Flight Training Inquiries",
      description: "Get in touch with Skylogix Aviation for flight training, scheduling, and program inquiries.",
      alternates: { canonical: `${SITE_URL}/inquiries` },
      openGraph: {
        title: `Contact ${SITE_NAME}`,
        description: "Questions about flight training? Contact us at Brackett Field.",
        url: `${SITE_URL}/inquiries`,
        images: [{ url: "/mockDesign.png", width: 1200, height: 630, alt: `Contact ${SITE_NAME}` }],
      },
    };
  }
}

export default async function InquiriesPage() {
  const [contactData, companyData] = await Promise.all([
    readContact(),
    readCompany(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Contact Us", url: `${SITE_URL}/inquiries` },
        ]}
      />
      <InquiriesContent contactData={contactData} companyData={companyData} />
    </>
  );
}
