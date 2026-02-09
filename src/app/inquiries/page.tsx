import type { Metadata } from "next";
import InquiriesContent from "./_components/InquiriesContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { readContact, readCompany } from "@/lib/admin/dal";

export const metadata: Metadata = {
  title: "Contact Us - Flight Training Inquiries",
  description:
    "Get in touch with Skylogix Aviation for flight training, scheduling, discovery flights, and program inquiries. Located at Brackett Field (KPOC), La Verne, CA. Call (562) 266-6868.",
  alternates: {
    canonical: `${SITE_URL}/inquiries`,
  },
  openGraph: {
    title: "Contact Skylogix Aviation",
    description:
      "Questions about flight training? Contact us at Brackett Field (KPOC). Phone: (562) 266-6868.",
    url: `${SITE_URL}/inquiries`,
    images: [{ url: "/mockDesign.png", width: 1200, height: 630, alt: "Contact Skylogix Aviation" }],
  },
};

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
