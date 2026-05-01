import { SITE_URL } from "@/lib/constants";
import type { CompanyData } from "@/components/layout/LayoutContent";

// ── Local Business (Homepage) ──────────────────────────────────────────────

export function LocalBusinessJsonLd({ companyData }: { companyData: CompanyData }) {
  const company = companyData;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    legalName: company.name,
    description:
      "FAA-certified flight school at Brackett Field Airport (KPOC) in La Verne, California. Offering affordable Private Pilot, Instrument Rating, Commercial Pilot, CFI, and ATP training in well-maintained Cessna 152 aircraft. Serving the greater Los Angeles and Inland Empire area.",
    url: SITE_URL,
    telephone: company.phone,
    email: company.email,
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.location.address,
      addressLocality: company.location.city,
      addressRegion: "CA",
      postalCode: company.location.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.0925,
      longitude: -117.7834,
    },
    hasMap: "https://maps.google.com/?q=1395+Fairplex+Dr+La+Verne+CA+91750",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "16:00",
      },
    ],
    image: [
      `${SITE_URL}/landing_Image.png`,
      `${SITE_URL}/fullLogo.png`,
    ],
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/fullLogo.png`,
      width: 300,
      height: 54,
    },
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    areaServed: [
      {
        "@type": "City",
        name: "La Verne",
        sameAs: "https://en.wikipedia.org/wiki/La_Verne,_California",
      },
      { "@type": "City", name: "Pomona" },
      { "@type": "City", name: "Claremont" },
      { "@type": "City", name: "Ontario" },
      { "@type": "City", name: "Upland" },
      { "@type": "City", name: "Chino" },
      { "@type": "City", name: "San Dimas" },
      { "@type": "City", name: "Diamond Bar" },
      { "@type": "City", name: "Walnut" },
      { "@type": "City", name: "Glendora" },
      {
        "@type": "AdministrativeArea",
        name: "Inland Empire",
      },
      {
        "@type": "AdministrativeArea",
        name: "Los Angeles County",
        sameAs: "https://en.wikipedia.org/wiki/Los_Angeles_County,_California",
      },
      {
        "@type": "State",
        name: "California",
        sameAs: "https://en.wikipedia.org/wiki/California",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phone,
        contactType: "customer service",
        email: company.email,
        areaServed: "US",
        availableLanguage: ["English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "16:00",
        },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Flight Training Services — Skylogix Aviation",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Discovery Flight",
          description:
            "Introductory flight experience in a Cessna 152 with an FAA-certified instructor. Perfect for first-time flyers exploring aviation.",
          itemOffered: {
            "@type": "Service",
            name: "Discovery Flight",
            serviceType: "Introductory Flight Lesson",
          },
          availability: "https://schema.org/InStock",
          areaServed: "La Verne, CA",
        },
        {
          "@type": "Offer",
          name: "Aircraft Rental — Cessna 152",
          description:
            "IFR-rated Cessna 152 rental for solo or dual flight training at Brackett Field (KPOC). Wet rate includes fuel.",
          itemOffered: {
            "@type": "Service",
            name: "Cessna 152 Aircraft Rental",
            serviceType: "Aircraft Rental",
          },
          price: "120",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "120",
            priceCurrency: "USD",
            unitText: "per hour (wet)",
          },
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Flight Instruction",
          description:
            "One-on-one flight lessons with FAA-certified flight instructors (CFI) covering PPL, IFR, CPL, CFI, and ATP ratings.",
          itemOffered: {
            "@type": "Service",
            name: "Flight Instruction",
            serviceType: "Flight Instruction",
          },
          price: "55",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "55",
            priceCurrency: "USD",
            unitText: "per hour",
          },
          availability: "https://schema.org/InStock",
        },
      ],
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable"],
    },
    sameAs: [
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
    "@id": `${SITE_URL}/#school`,
    name: company.name,
    url: SITE_URL,
    description:
      "FAA-authorized flight school in La Verne, California offering a full pilot training pathway from Private Pilot License (PPL) to Airline Transport Pilot (ATP) at Brackett Field Airport (KPOC).",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.location.address,
      addressLocality: company.location.city,
      addressRegion: "CA",
      postalCode: company.location.zip,
      addressCountry: "US",
    },
    telephone: company.phone,
    email: company.email,
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Private Pilot Certificate",
        description:
          "FAA Private Pilot Certificate (PPL) — the foundational pilot license. Minimum 40 flight hours, written test, and practical exam (checkride).",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Instrument Rating (IFR)",
        description:
          "FAA Instrument Rating — authorizes flight in instrument meteorological conditions (IMC). Minimum 50 cross-country hours, 40 instrument hours.",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Commercial Pilot Certificate",
        description:
          "FAA Commercial Pilot Certificate — allows compensation for flying. Minimum 250 total flight hours.",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Certified Flight Instructor (CFI)",
        description:
          "FAA Certified Flight Instructor certificate — authorizes teaching student pilots.",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Airline Transport Pilot Certificate (ATP)",
        description:
          "FAA Airline Transport Pilot Certificate — the highest pilot certification. Required to serve as airline captain. Minimum 1,500 flight hours.",
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

// ── FAQ (Training page) — US search-intent focused ─────────────────────────

export function FAQJsonLd({ companyData }: { companyData: CompanyData }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does it cost to learn to fly at Skylogix Aviation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Aircraft rental is ${companyData.rates.aircraft} (wet rate, fuel included) and flight instruction is ${companyData.rates.instruction} per hour. A typical dual training session costs approximately $175–$200 per hour combined. A Private Pilot License (PPL) typically requires 40–60 hours total, putting the average all-in cost between $7,000 and $12,000 depending on your pace of training.`,
        },
      },
      {
        "@type": "Question",
        name: "Where is Skylogix Aviation located and what airport do you fly from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Skylogix Aviation is located at ${companyData.location.full}, inside Brackett Field Airport (FAA identifier: KPOC) in La Verne, California. Brackett Field is a public general aviation airport in Los Angeles County, easily accessible from Pomona, Claremont, Ontario, Upland, San Dimas, Diamond Bar, and the greater Inland Empire area.`,
        },
      },
      {
        "@type": "Question",
        name: "How do I book a discovery flight at Skylogix Aviation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can book a discovery flight by calling us at ${companyData.phone} or emailing ${companyData.email}. A discovery flight is a 30–60 minute introductory lesson where you actually fly a Cessna 152 with a certified instructor. No experience required. It is the best first step before committing to a full training program.`,
        },
      },
      {
        "@type": "Question",
        name: "Is Skylogix Aviation FAA-approved?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Skylogix Aviation operates in full compliance with FAA regulations at Brackett Field (KPOC). All flight instruction is conducted by FAA-Certificated Flight Instructors (CFIs). Our Cessna 152 aircraft are maintained to FAA airworthiness standards and are regularly inspected.",
        },
      },
      {
        "@type": "Question",
        name: "How long does it take to get a Private Pilot License (PPL) in California?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most students at Skylogix Aviation earn their Private Pilot License in 3 to 6 months training consistently (2–3 days per week). The FAA requires a minimum of 40 flight hours, including at least 20 hours of dual instruction and 10 hours of solo flight. Southern California's year-round VFR weather makes it one of the best places in the US to complete training quickly.",
        },
      },
      {
        "@type": "Question",
        name: "What is the path from zero to airline pilot?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The full pathway at Skylogix Aviation: (1) Private Pilot License (PPL) — 40+ hours, ~3–6 months; (2) Instrument Rating (IFR) — 50+ hours PIC, ~3–4 months; (3) Commercial Pilot License (CPL) — 250 total hours; (4) Certified Flight Instructor (CFI) — build flight hours while teaching; (5) Airline Transport Pilot (ATP) — 1,500 total hours, minimum age 23. Most students reach ATP eligibility within 3–5 years starting from zero.",
        },
      },
      {
        "@type": "Question",
        name: "Can international students train at Skylogix Aviation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, international students are welcome. However, per TSA regulations (49 CFR Part 1552), foreign nationals must complete TSA security threat assessment approval before beginning flight training. We can guide you through this process. Contact us at " + companyData.phone + " for details.",
        },
      },
      {
        "@type": "Question",
        name: "What does 'wet rate' mean for aircraft rental?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `A "wet rate" means the rental price includes fuel (avgas). Skylogix Aviation's Cessna 152 wet rate is ${companyData.rates.aircraft}, with no separate fuel charge. This makes it easy to budget your training costs — what you see is what you pay for aircraft time.`,
        },
      },
      {
        "@type": "Question",
        name: "Do I need a medical certificate to start flight training?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You do not need a medical certificate to start training or to fly solo on a Student Pilot Certificate. However, to earn a Private Pilot License you will need at least a 3rd-Class FAA Medical Certificate from an Aviation Medical Examiner (AME). For Commercial, you need a 2nd-Class, and for ATP, a 1st-Class medical. We recommend scheduling your medical early in the process.",
        },
      },
      {
        "@type": "Question",
        name: "Why choose Skylogix Aviation over other flight schools in Los Angeles?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Skylogix Aviation offers some of the most affordable rates in Southern California at ${companyData.rates.aircraft} wet for aircraft rental and ${companyData.rates.instruction} for instruction. We fly from Brackett Field (KPOC) — a less congested general aviation airport compared to busier LA-area airports, meaning more time flying and less time waiting. Our well-maintained IFR-rated Cessna 152 fleet, experienced CFIs, and commitment to student success make us a top choice for pilot training in the Inland Empire and greater Los Angeles area.`,
        },
      },
      {
        "@type": "Question",
        name: "What are Skylogix Aviation's hours and how do I contact them?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Skylogix Aviation is open ${companyData.hours}. Phone: ${companyData.phone}. Email: ${companyData.email}. We are located at ${companyData.location.full}, at Brackett Field Airport (KPOC).`,
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
    name: "Pilot Training Programs — Skylogix Aviation, La Verne CA",
    description:
      "Complete FAA-approved aviation training programs from zero to airline pilot at Brackett Field (KPOC), La Verne, California.",
    numberOfItems: steps.length,
    itemListElement: steps.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: `${step.title} (${step.abbreviation}) — Skylogix Aviation`,
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
            addressRegion: "CA",
            postalCode: companyData.location.zip,
            addressCountry: "US",
          },
        },
        coursePrerequisites: step.requirements.join("; "),
        educationalCredentialAwarded: step.title,
        url: `${SITE_URL}/training`,
        inLanguage: "en-US",
        locationCreated: {
          "@type": "Place",
          name: "Brackett Field Airport (KPOC)",
          address: {
            "@type": "PostalAddress",
            addressLocality: "La Verne",
            addressRegion: "CA",
            addressCountry: "US",
          },
        },
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
    name: `${plane.name} — ${plane.year} ${plane.model} | Skylogix Aviation`,
    description: `${plane.year} Cessna ${plane.model} (Registration: ${plane.id}) available for flight training rental at Brackett Field (KPOC), La Verne, CA. ${plane.engine} engine, ${plane.horsepower} HP, ${plane.flightRule}-rated. ${plane.description}`,
    image: plane.images.map((img) =>
      img.startsWith("http") ? img : `${SITE_URL}${img}`
    ),
    brand: {
      "@type": "Brand",
      name: "Cessna",
    },
    offers: {
      "@type": "Offer",
      price: plane.pricePerHour.replace(/[^0-9.]/g, ""),
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plane.pricePerHour.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        unitText: "per hour (wet rate)",
      },
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      seller: {
        "@type": "LocalBusiness",
        name: "Skylogix Aviation",
        url: SITE_URL,
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Engine", value: plane.engine },
      { "@type": "PropertyValue", name: "Horsepower", value: `${plane.horsepower} HP` },
      { "@type": "PropertyValue", name: "Flight Rules", value: plane.flightRule },
      { "@type": "PropertyValue", name: "Year", value: String(plane.year) },
      { "@type": "PropertyValue", name: "FAA Registration", value: plane.id },
      { "@type": "PropertyValue", name: "Base Airport", value: "Brackett Field (KPOC), La Verne, CA" },
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

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
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
