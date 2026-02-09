import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ── Company ──
  await prisma.company.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Skylogix Aviation",
      address: "1395 Fairplex Dr. Hangar D4",
      city: "La Verne",
      state: "CA",
      zip: "91750",
      full: "1395 Fairplex Dr. Hangar D4, La Verne, CA 91750",
      airport: "Brackett Field (KPOC)",
      phone: "(562) 266-6868",
      email: "info@skylogixaviation.com",
      hours: "Mon-Fri 09:00 am - 04:00 pm",
      rateAircraft: "$120 /hr (Wet)",
      rateInstruction: "$55 / hr",
    },
  });

  // ── Aircraft ──
  const aircraftData = [
    {
      id: "N49202",
      name: "N49202",
      year: 1977,
      model: "Cessna 152 II",
      engine: "Lycoming O-235-L2C",
      horsepower: 115,
      flightRule: "IFR",
      pricePerHour: "$120 /hr (Wet)",
      description:
        "The Cessna 152 is a reliable, fuel-efficient two-seat trainer, perfect for safe and affordable flight training.",
      images: [
        "/N49202/N49202_1.jpeg",
        "/N49202/N49202_2.jpeg",
        "/N49202/N49202_3.jpeg",
        "/N49202/N49202_4.jpeg",
        "/N49202/N49202_5.jpeg",
        "/N49202/N49202_6.jpeg",
      ],
    },
    {
      id: "N4900L",
      name: "N4900L",
      year: 1980,
      model: "Cessna 152 II",
      engine: "Lycoming O-235-L2C",
      horsepower: 115,
      flightRule: "IFR",
      pricePerHour: "$120 /hr (Wet)",
      description:
        "The Cessna 152 is a reliable, fuel-efficient two-seat trainer, perfect for safe and affordable flight training.",
      images: [
        "/N4900L/N4900L_1.jpeg",
        "/N4900L/N4900L_2.jpeg",
        "/N4900L/N4900L_3.jpeg",
        "/N4900L/N4900L_4.jpeg",
        "/N4900L/N4900L_5.jpeg",
        "/N4900L/N4900L_6.jpeg",
      ],
    },
    {
      id: "N25976",
      name: "N25976",
      year: 1978,
      model: "Cessna 152 II",
      engine: "Lycoming O-235-L2C",
      horsepower: 115,
      flightRule: "IFR",
      pricePerHour: "$120 /hr (Wet)",
      description:
        "The Cessna 152 is a reliable, fuel-efficient two-seat trainer, perfect for safe and affordable flight training.",
      images: [
        "/N25976/N25976_1.jpeg",
        "/N25976/N25976_2.jpeg",
        "/N25976/N25976_3.jpeg",
        "/N25976/N25976_4.jpeg",
        "/N25976/N25976_5.jpeg",
      ],
    },
  ];

  for (const aircraft of aircraftData) {
    await prisma.aircraft.upsert({
      where: { id: aircraft.id },
      update: {},
      create: aircraft,
    });
  }

  // ── Crew Categories ──
  const categories = [
    { key: "founder", label: "Founder", order: 0 },
    { key: "instructor", label: "Instructor", order: 1 },
    { key: "mechanic", label: "Mechanic", order: 2 },
  ];

  for (const cat of categories) {
    await prisma.crewCategory.upsert({
      where: { key: cat.key },
      update: {},
      create: cat,
    });
  }

  // ── Crew Members ──
  const crewMembers = [
    { id: "founder-1", name: "TBD", role: "Founder", image: "/coming_soon.png", certifications: [], categoryKey: "founder", order: 0 },
    { id: "instructor-1", name: "TBD", role: "Flight Instructor", image: "/coming_soon.png", certifications: [], categoryKey: "instructor", order: 0 },
    { id: "instructor-2", name: "TBD", role: "Flight Instructor", image: "/coming_soon.png", certifications: [], categoryKey: "instructor", order: 1 },
    { id: "instructor-3", name: "TBD", role: "Flight Instructor", image: "/coming_soon.png", certifications: [], categoryKey: "instructor", order: 2 },
    { id: "mechanic-1", name: "TBD", role: "Aircraft Mechanic", image: "/coming_soon.png", certifications: [], categoryKey: "mechanic", order: 0 },
    { id: "mechanic-2", name: "TBD", role: "Aircraft Mechanic", image: "/coming_soon.png", certifications: [], categoryKey: "mechanic", order: 1 },
  ];

  for (const member of crewMembers) {
    await prisma.crewMember.upsert({
      where: { id: member.id },
      update: {},
      create: member,
    });
  }

  // ── Training Steps ──
  const trainingSteps = [
    {
      id: "ppl",
      order: 1,
      title: "Private Pilot License",
      abbreviation: "PPL",
      icon: "✈️",
      description: "Your foundation in aviation. Fly solo, take passengers, and explore the skies for fun.",
      accentColor: "border-blue-500",
      accentBg: "bg-blue-50",
      accentText: "text-blue-600",
      requirements: ["Age: 17+", "40+ flight hours (20 dual / 10 solo)", "Pass FAA Knowledge Test & Checkride", "3rd-Class Medical Certificate"],
      learns: ["Aircraft control", "Cross-country navigation", "Weather basics", "Radio communication", "Emergency procedures"],
      learnsLabel: "You'll Learn",
    },
    {
      id: "ifr",
      order: 2,
      title: "Instrument Rating",
      abbreviation: "IFR",
      icon: "🧭",
      description: "Fly safely through clouds, fog, and limited visibility—critical for serious pilots.",
      accentColor: "border-indigo-500",
      accentBg: "bg-indigo-50",
      accentText: "text-indigo-600",
      requirements: ["PPL required", "50+ hours cross-country PIC", "40+ hours instrument time", "Instrument Knowledge Test & Checkride"],
      learns: ["Instrument-only flying", "Holding patterns & approaches", "IFR charts & procedures", "Weather analysis"],
      learnsLabel: "You'll Learn",
    },
    {
      id: "cpl",
      order: 3,
      title: "Commercial Pilot License",
      abbreviation: "CPL",
      icon: "💼",
      description: "Start getting paid to fly—step into the world of professional aviation.",
      accentColor: "border-amber-500",
      accentBg: "bg-amber-50",
      accentText: "text-amber-600",
      requirements: ["Age: 18+", "PPL + IFR", "250 total hours", "Commercial Knowledge Test & Checkride"],
      learns: ["Complex aircraft operation", "Advanced maneuvers", "Precision flying techniques"],
      learnsLabel: "You'll Learn",
    },
    {
      id: "cfi",
      order: 4,
      title: "Certified Flight Instructor",
      abbreviation: "CFI",
      icon: "🎓",
      description: "Teach others to fly, sharpen your own skills, and build flight hours fast.",
      accentColor: "border-emerald-500",
      accentBg: "bg-emerald-50",
      accentText: "text-emerald-600",
      requirements: ["CPL required", "FOI & CFI Knowledge Tests", "CFI Checkride"],
      learns: ["Build time toward ATP", "Earn while you fly", "Inspire the next generation of pilots"],
      learnsLabel: "Benefits",
    },
    {
      id: "atp",
      order: 5,
      title: "Airline Transport Pilot",
      abbreviation: "ATP",
      icon: "🛫",
      description: "The final goal—required to become an airline captain.",
      accentColor: "border-gold-500",
      accentBg: "bg-gold-100",
      accentText: "text-gold-600",
      requirements: ["Age: 23+", "CPL + IFR", "1,500 flight hours total", "ATP Knowledge Test & Checkride"],
      learns: ["Airline job eligibility", "Advanced systems training", "Professional flight experience"],
      learnsLabel: "What You'll Gain",
    },
  ];

  for (const step of trainingSteps) {
    await prisma.trainingStep.upsert({
      where: { id: step.id },
      update: {},
      create: step,
    });
  }

  // ── Training Config ──
  await prisma.trainingConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      intro: "At Skylogix Aviation, we're more than just a flight school—we're your launchpad to the airlines. Here's a step-by-step guide with visual cues to help you see where you're headed",
      ctaTitle: "Ready to Take Off?",
      ctaIcon: "🚀",
      ctaDescription: "Book your Discovery Flight today and get a taste of life in the cockpit.",
      ctaLocation: "Located at Brackett Field (KPOC)",
    },
  });

  // ── Nav Items ──
  const navItems = [
    { label: "Home", href: "/", scrollTo: "top", order: 0 },
    { label: "Aircrafts", href: "/", scrollTo: "aircrafts", order: 1 },
    { label: "Our Crew", href: "/", scrollTo: "crew", order: 2 },
    { label: "Become A Pilot", href: "/becomepilot", scrollTo: null, order: 3 },
  ];

  // Clear and re-insert nav items
  await prisma.navItem.deleteMany();
  for (const item of navItems) {
    await prisma.navItem.create({ data: item });
  }

  // ── Nav CTA ──
  await prisma.navCta.upsert({
    where: { id: 1 },
    update: {},
    create: {
      label: "Contact Us",
      href: "/inquiries",
    },
  });

  // ── Home Page ──
  await prisma.homePage.upsert({
    where: { id: 1 },
    update: {},
    create: {
      heroTitle: "Learn to Fly",
      heroSubtitle: "in a way that is quick, easy, and efficient",
      heroCta: "Contact Us",
      welcomeTitle: "Welcome to\nSkylogix Aviation",
      welcomeDescription:
        "where your aviation dreams take flight! We are dedicated to providing high-quality, affordable flight training in our well-maintained Cessna 152 aircrafts. Our mission is to make flying accessible while maintaining the highest safety standards, ensuring that every student can pursue their passion for aviation without financial barriers. Beyond training, we are committed to fostering a supportive and inspiring community where students and instructors work together to achieve their ultimate goal becoming airline transport pilots. Join us and start your journey to the skies today!",
      aircraftsTitle: "Aircrafts",
      crewTitle: "Our Crew",
      crewTabs: ["Founder", "Instructor", "Mechanic"],
    },
  });

  // ── Contact Config ──
  await prisma.contactConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      pageIntro:
        "Have questions about flight training, scheduling, or our programs? We're here to help! Whether you're ready to start your journey toward becoming a pilot or just need more information, feel free to reach out.",
      formFields: [
        { name: "name", label: "Name", type: "text", placeholder: "name", required: true },
        { name: "email", label: "Email", type: "email", placeholder: "email", required: true },
        { name: "phone", label: "Phone", type: "text", placeholder: "phone", required: true },
        { name: "message", label: "Comment", type: "textarea", placeholder: "comment", required: true },
      ],
      submitDefault: "Submit",
      submitSending: "Sending...",
      submitSuccess: "Successful!",
      submitAlreadySent: "Already Sent",
      alertSuccess: "Successfully sent!",
      alertError: "Failed to Send Email. Please Contact Us Directly",
    },
  });

  // ── Site Metadata ──
  await prisma.siteMetadata.upsert({
    where: { id: 1 },
    update: {},
    create: {
      siteName: "Skylogix Aviation",
      defaultTitle: "Skylogix Aviation",
      defaultDescription: "Skylogix Aviation",
      pages: {
        home: {
          title: "Skylogix Aviation | Learn to Fly",
          description: "Affordable, high-quality flight training at Brackett Field (KPOC). Cessna 152 rentals and professional instruction.",
        },
        fleet: {
          title: "Our Fleet | Skylogix Aviation",
          description: "Explore our well-maintained Cessna 152 aircraft available for flight training at $120/hr wet.",
        },
        training: {
          title: "Become A Pilot | Skylogix Aviation",
          description: "Your step-by-step guide from Private Pilot to Airline Transport Pilot. Start your aviation journey today.",
        },
        inquiries: {
          title: "Contact Us | Skylogix Aviation",
          description: "Get in touch with Skylogix Aviation for flight training, scheduling, and program inquiries.",
        },
        about: {
          title: "About Us | Skylogix Aviation",
          description: "Learn about our mission, crew, and commitment to affordable aviation training.",
        },
      },
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
