import { SITE_URL } from "@/lib/constants";
import type { CompanyData } from "@/components/layout/LayoutContent";

// ── Local Business (Homepage) ──────────────────────────────────────────────

export function LocalBusinessJsonLd({ companyData }: { companyData: CompanyData }) {
  const company = companyData;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
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
    logo: `${SITE_URL}/fullLogo.png`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    areaServed: [
      { "@type": "City", name: "La Verne", sameAs: "https://en.wikipedia.org/wiki/La_Verne,_California" },
      { "@type": "City", name: "Pomona" },
      { "@type": "City", name: "Claremont" },
      { "@type": "City", name: "Ontario" },
      { "@type": "City", name: "Upland" },
      { "@type": "State", name: "California" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Flight Training Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Aircraft Rental - Cessna 152",
            description: "Cessna 152 aircraft rental for flight training at Brackett Field (KPOC)",
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
            description: "Professional flight instruction from FAA-certified CFIs",
          },
          price: "55",
          priceCurrency: "USD",
          unitText: "per hour",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Discovery Flight",
            description: "Introductory flight experience — try flying before committing to training",
          },
        },
      ],
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable"],
    },
    sameAs: [
      "https://www.facebook.com/skylogixaviation",
      "https://www.instagram.com/skylogixaviation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Flight School / Educational Org (Training page) ────────────────────────

export function FlightSchoolJsonLd({ companyData }: { companyData: CompanyData }) {
  const company = companyData;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: company.name,
    url: SITE_URL,
    description:
      "FAA-compliant flight school offering Private Pilot License (PPL), Instrument Rating (IFR), Commercial Pilot License (CPL), Certified Flight Instructor (CFI), and Airline Transport Pilot (ATP) training programs at Brackett Field (KPOC) in La Verne, California.",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.location.address,
      addressLocality: company.location.city,
      addressRegion: company.location.state,
      postalCode: company.location.zip,
      addressCountry: "US",
    },
    telephone: company.phone,
    email: company.email,
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

// ── FAQ (Training page) ────────────────────────────────────────────────────

export function FAQJsonLd({ companyData }: { companyData: CompanyData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does flight training cost at Skylogix Aviation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Aircraft rental is ${companyData.rates.aircraft} and flight instruction is ${companyData.rates.instruction}. Combined cost per training hour is typically $175-$200 depending on your program.`,
        },
      },
      {
        "@type": "Question",
        name: "Where is Skylogix Aviation located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Skylogix Aviation is located at ${companyData.location.full}, at Brackett Field Airport (KPOC) in La Verne, California.`,
        },
      },
      {
        "@type": "Question",
        name: "What aircraft does Skylogix Aviation use for training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We train in well-maintained Cessna 152 aircraft — IFR-rated, two-seat trainers ideal for beginner and advanced flight training. All aircraft are regularly inspected and maintained to the highest safety standards.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to get a Private Pilot License (PPL)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most students earn their Private Pilot License in 3–6 months with consistent training. The FAA requires a minimum of 40 flight hours, including at least 20 hours with an instructor and 10 hours of solo flight time.",
        },
      },
      {
        "@type": "Question",
        name: "What is a discovery flight and how much does it cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A discovery flight is an introductory lesson where you take the controls of a real aircraft with a certified instructor. It is the perfect way to experience flying before committing to a full training program. Contact us for current pricing.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a medical certificate to fly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. For a Private Pilot License, you need a 3rd-Class FAA Medical Certificate from an Aviation Medical Examiner (AME). For Commercial and ATP ratings, higher medical classes are required.",
        },
      },
      {
        "@type": "Question",
        name: "What are Skylogix Aviation's hours of operation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${companyData.name} is open ${companyData.hours}. Contact us at ${companyData.phone} or ${companyData.email} to schedule your training sessions.`,
        },
      },
      {
        "@type": "Question",
        name: "What is the path from Private Pilot to Airline Transport Pilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The path is: Private Pilot License (PPL) → Instrument Rating (IFR) → Commercial Pilot License (CPL) → Certified Flight Instructor (CFI) → Airline Transport Pilot (ATP). Each step builds on the previous, and we offer training for all levels at Skylogix Aviation.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Course List (Training page) ────────────────────────────────────────────

interface TrainingStep {
  id: string;
  title: string;
  abbreviation: string;
  description: string;
  requirements: string[];
}

export function CourseListJsonLd({
  steps,
  companyData,
}: {
  steps: TrainingStep[];
  companyData: CompanyData;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pilot Training Programs at Skylogix Aviation",
    description: "Complete aviation training programs from Private Pilot License to Airline Transport Pilot",
    itemListElement: steps.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: step.title,
        description: step.description,
        identifier: step.abbreviation,
        provider: {
          "@type": "EducationalOrganization",
          name: companyData.name,
          url: SITE_URL,
          address: {
            "@type": "PostalAddress",
            streetAddress: companyData.location.address,
            addressLocality: companyData.location.city,
            addressRegion: companyData.location.state,
            postalCode: companyData.location.zip,
            addressCountry: "US",
          },
        },
        coursePrerequisites: step.requirements.join("; "),
        educationalCredentialAwarded: step.title,
        url: `${SITE_URL}/training`,
        inLanguage: "en-US",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Aircraft / Product (Fleet detail page) ─────────────────────────────────

interface AircraftData {
  id: string;
  name: string;
  year: number;
  model: string;
  engine: string;
  horsepower: number;
  flightRule: string;
  pricePerHour: string;
  description: string;
  images: string[];
}

export function AircraftJsonLd({ plane }: { plane: AircraftData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${plane.name} - ${plane.year} ${plane.model}`,
    description: plane.description,
    image: plane.images.map((img) => (img.startsWith("http") ? img : `${SITE_URL}${img}`)),
    offers: {
      "@type": "Offer",
      price: plane.pricePerHour.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "LocalBusiness",
        name: "Skylogix Aviation",
        url: SITE_URL,
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Engine", value: plane.engine },
      { "@type": "PropertyValue", name: "Horsepower", value: `${plane.horsepower} HP` },
      { "@type": "PropertyValue", name: "Flight Rule", value: plane.flightRule },
      { "@type": "PropertyValue", name: "Year", value: String(plane.year) },
      { "@type": "PropertyValue", name: "Registration", value: plane.id },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ── Breadcrumb ─────────────────────────────────────────────────────────────

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
