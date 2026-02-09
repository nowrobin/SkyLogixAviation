import { SITE_URL } from "@/lib/constants";
import type { CompanyData } from "@/components/layout/LayoutContent";

export function LocalBusinessJsonLd({ companyData }: { companyData: CompanyData }) {
  const company = companyData;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL,
    name: company.name,
    description:
      "Affordable, high-quality flight training at Brackett Field (KPOC). Cessna 152 rentals and professional flight instruction in La Verne, California.",
    url: SITE_URL,
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.location.address,
      addressLocality: company.location.city,
      addressRegion: company.location.state,
      postalCode: company.location.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0925,
      longitude: -117.7834,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "16:00",
    },
    image: `${SITE_URL}/fullLogo.png`,
    priceRange: "$$",
    additionalType: "https://schema.org/EducationalOrganization",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Flight Training Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Aircraft Rental - Cessna 152",
            description: "Cessna 152 aircraft rental for flight training",
          },
          price: "120",
          priceCurrency: "USD",
          unitText: "per hour (wet)",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Flight Instruction",
            description: "Professional flight instruction from certified CFIs",
          },
          price: "55",
          priceCurrency: "USD",
          unitText: "per hour",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FlightSchoolJsonLd({ companyData }: { companyData: CompanyData }) {
  const company = companyData;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: company.name,
    url: SITE_URL,
    description:
      "Flight school offering Private Pilot License (PPL), Instrument Rating (IFR), Commercial Pilot License (CPL), CFI, and ATP training programs.",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.location.address,
      addressLocality: company.location.city,
      addressRegion: company.location.state,
      postalCode: company.location.zip,
      addressCountry: "US",
    },
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Private Pilot License (PPL)" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Instrument Rating (IFR)" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Commercial Pilot License (CPL)" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Certified Flight Instructor (CFI)" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Airline Transport Pilot (ATP)" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
