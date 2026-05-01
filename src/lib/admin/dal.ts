import { prisma } from "@/lib/prisma";

// ── Company ──

export async function readCompany() {
  const row = await prisma.company.findFirst();
  if (!row) throw new Error("Company data not found");
  return {
    name: row.name,
    location: {
      address: row.address,
      city: row.city,
      state: row.state,
      zip: row.zip,
      full: row.full,
      airport: row.airport,
    },
    phone: row.phone,
    email: row.email,
    hours: row.hours,
    rates: {
      aircraft: row.rateAircraft,
      instruction: row.rateInstruction,
    },
  };
}

export async function writeCompany(data: {
  name: string;
  location: { address: string; city: string; state: string; zip: string; full: string; airport: string };
  phone: string;
  email: string;
  hours: string;
  rates: { aircraft: string; instruction: string };
}) {
  await prisma.company.upsert({
    where: { id: 1 },
    update: {
      name: data.name,
      address: data.location.address,
      city: data.location.city,
      state: data.location.state,
      zip: data.location.zip,
      full: data.location.full,
      airport: data.location.airport,
      phone: data.phone,
      email: data.email,
      hours: data.hours,
      rateAircraft: data.rates.aircraft,
      rateInstruction: data.rates.instruction,
    },
    create: {
      name: data.name,
      address: data.location.address,
      city: data.location.city,
      state: data.location.state,
      zip: data.location.zip,
      full: data.location.full,
      airport: data.location.airport,
      phone: data.phone,
      email: data.email,
      hours: data.hours,
      rateAircraft: data.rates.aircraft,
      rateInstruction: data.rates.instruction,
    },
  });
}

// ── Home ──

export async function readHome() {
  const row = await prisma.homePage.findFirst();
  if (!row) throw new Error("Home data not found");
  return {
    hero: {
      title: row.heroTitle,
      subtitle: row.heroSubtitle,
      cta: row.heroCta,
    },
    welcome: {
      title: row.welcomeTitle,
      description: row.welcomeDescription,
    },
    sections: {
      aircrafts: { title: row.aircraftsTitle },
      crew: {
        title: row.crewTitle,
        tabs: row.crewTabs,
      },
    },
  };
}

export async function writeHome(data: {
  hero: { title: string; subtitle: string; cta: string };
  welcome: { title: string; description: string };
  sections: {
    aircrafts: { title: string };
    crew: { title: string; tabs: string[] };
  };
}) {
  await prisma.homePage.upsert({
    where: { id: 1 },
    update: {
      heroTitle: data.hero.title,
      heroSubtitle: data.hero.subtitle,
      heroCta: data.hero.cta,
      welcomeTitle: data.welcome.title,
      welcomeDescription: data.welcome.description,
      aircraftsTitle: data.sections.aircrafts.title,
      crewTitle: data.sections.crew.title,
      crewTabs: data.sections.crew.tabs,
    },
    create: {
      heroTitle: data.hero.title,
      heroSubtitle: data.hero.subtitle,
      heroCta: data.hero.cta,
      welcomeTitle: data.welcome.title,
      welcomeDescription: data.welcome.description,
      aircraftsTitle: data.sections.aircrafts.title,
      crewTitle: data.sections.crew.title,
      crewTabs: data.sections.crew.tabs,
    },
  });
}

// ── Fleet ──

export async function readFleet() {
  const rows = await prisma.aircraft.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    year: r.year,
    model: r.model,
    engine: r.engine,
    horsepower: r.horsepower,
    flightRule: r.flightRule,
    pricePerHour: r.pricePerHour,
    description: r.description,
    images: r.images,
    order: r.order,
  }));
}

export async function reorderFleet(ids: string[]) {
  await Promise.all(
    ids.map((id, index) =>
      prisma.aircraft.update({ where: { id }, data: { order: index } })
    )
  );
}

export async function readFleetById(id: string) {
  const r = await prisma.aircraft.findUnique({ where: { id } });
  if (!r) return null;
  return {
    id: r.id,
    name: r.name,
    year: r.year,
    model: r.model,
    engine: r.engine,
    horsepower: r.horsepower,
    flightRule: r.flightRule,
    pricePerHour: r.pricePerHour,
    description: r.description,
    images: r.images,
  };
}

export async function createAircraft(data: {
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
}) {
  const count = await prisma.aircraft.count();
  await prisma.aircraft.create({ data: { ...data, order: count } });
}

export async function updateAircraft(
  id: string,
  data: {
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
) {
  await prisma.aircraft.update({
    where: { id },
    data: {
      id: data.id,
      name: data.name,
      year: data.year,
      model: data.model,
      engine: data.engine,
      horsepower: data.horsepower,
      flightRule: data.flightRule,
      pricePerHour: data.pricePerHour,
      description: data.description,
      images: data.images,
    },
  });
}

export async function deleteAircraft(id: string) {
  await prisma.aircraft.delete({ where: { id } });
}

// ── Crew ──

export async function readCrew() {
  const categories = await prisma.crewCategory.findMany({ orderBy: { order: "asc" } });
  const members = await prisma.crewMember.findMany({ orderBy: { order: "asc" } });

  const membersByCategory: Record<string, typeof members> = {};
  for (const cat of categories) {
    membersByCategory[cat.key] = members
      .filter((m) => m.categoryKey === cat.key)
      .map((m) => ({
        ...m,
        certifications: m.certifications,
      }));
  }

  return {
    categories: categories.map((c) => ({ key: c.key, label: c.label })),
    members: membersByCategory,
  };
}

export async function writeCrew(data: {
  categories: { key: string; label: string }[];
  members: Record<string, { id: string; name: string; role: string; image: string; bio?: string | null; certifications?: string[] }[]>;
}) {
  // Upsert categories
  for (let i = 0; i < data.categories.length; i++) {
    const cat = data.categories[i];
    await prisma.crewCategory.upsert({
      where: { key: cat.key },
      update: { label: cat.label, order: i },
      create: { key: cat.key, label: cat.label, order: i },
    });
  }

  // Delete categories no longer present
  const keepKeys = data.categories.map((c) => c.key);
  await prisma.crewMember.deleteMany({ where: { categoryKey: { notIn: keepKeys } } });
  await prisma.crewCategory.deleteMany({ where: { key: { notIn: keepKeys } } });

  // Upsert members
  const allMemberIds: string[] = [];
  for (const [categoryKey, members] of Object.entries(data.members)) {
    for (let i = 0; i < members.length; i++) {
      const m = members[i];
      allMemberIds.push(m.id);
      await prisma.crewMember.upsert({
        where: { id: m.id },
        update: {
          name: m.name,
          role: m.role,
          image: m.image,
          bio: m.bio ?? null,
          certifications: m.certifications ?? [],
          categoryKey,
          order: i,
        },
        create: {
          id: m.id,
          name: m.name,
          role: m.role,
          image: m.image,
          bio: m.bio ?? null,
          certifications: m.certifications ?? [],
          categoryKey,
          order: i,
        },
      });
    }
  }

  // Delete removed members
  await prisma.crewMember.deleteMany({ where: { id: { notIn: allMemberIds } } });
}

// ── Training ──

export async function readTraining() {
  const config = await prisma.trainingConfig.findFirst();
  const steps = await prisma.trainingStep.findMany({ orderBy: { order: "asc" } });

  return {
    intro: config?.intro ?? "",
    cta: config
      ? {
          title: config.ctaTitle,
          icon: config.ctaIcon,
          description: config.ctaDescription,
          location: config.ctaLocation,
        }
      : null,
    steps: steps.map((s) => ({
      id: s.id,
      order: s.order,
      title: s.title,
      abbreviation: s.abbreviation,
      icon: s.icon,
      description: s.description,
      accentColor: s.accentColor,
      accentBg: s.accentBg,
      accentText: s.accentText,
      requirements: s.requirements,
      learns: s.learns,
      learnsLabel: s.learnsLabel,
    })),
  };
}

export async function writeTraining(data: {
  intro: string;
  cta: { title: string; icon: string; description: string; location: string };
  steps: {
    id: string;
    order: number;
    title: string;
    abbreviation: string;
    icon: string;
    description: string;
    accentColor: string;
    accentBg: string;
    accentText: string;
    requirements: string[];
    learns: string[];
    learnsLabel: string;
  }[];
}) {
  await prisma.trainingConfig.upsert({
    where: { id: 1 },
    update: {
      intro: data.intro,
      ctaTitle: data.cta.title,
      ctaIcon: data.cta.icon,
      ctaDescription: data.cta.description,
      ctaLocation: data.cta.location,
    },
    create: {
      intro: data.intro,
      ctaTitle: data.cta.title,
      ctaIcon: data.cta.icon,
      ctaDescription: data.cta.description,
      ctaLocation: data.cta.location,
    },
  });

  // Upsert steps
  const keepIds: string[] = [];
  for (const step of data.steps) {
    keepIds.push(step.id);
    await prisma.trainingStep.upsert({
      where: { id: step.id },
      update: step,
      create: step,
    });
  }
  await prisma.trainingStep.deleteMany({ where: { id: { notIn: keepIds } } });
}

// ── Navigation ──

export async function readNavigation() {
  const items = await prisma.navItem.findMany({ orderBy: { order: "asc" } });
  const cta = await prisma.navCta.findFirst();

  return {
    navItems: items.map((i) => ({
      label: i.label,
      href: i.href,
      ...(i.scrollTo ? { scrollTo: i.scrollTo } : {}),
    })),
    navCta: cta ? { label: cta.label, href: cta.href } : null,
  };
}

export async function writeNavigation(data: {
  navItems: { label: string; href: string; scrollTo?: string }[];
  navCta: { label: string; href: string };
}) {
  // Replace all nav items
  await prisma.navItem.deleteMany();
  for (let i = 0; i < data.navItems.length; i++) {
    const item = data.navItems[i];
    await prisma.navItem.create({
      data: {
        label: item.label,
        href: item.href,
        scrollTo: item.scrollTo ?? null,
        order: i,
      },
    });
  }

  await prisma.navCta.upsert({
    where: { id: 1 },
    update: { label: data.navCta.label, href: data.navCta.href },
    create: { label: data.navCta.label, href: data.navCta.href },
  });
}

// ── Contact ──

export async function readContact() {
  const row = await prisma.contactConfig.findFirst();
  if (!row) throw new Error("Contact data not found");
  return {
    contactPage: { intro: row.pageIntro },
    contactForm: {
      fields: row.formFields as { name: string; label: string; type: string; placeholder: string; required: boolean }[],
      submitButton: {
        default: row.submitDefault,
        sending: row.submitSending,
        success: row.submitSuccess,
        alreadySent: row.submitAlreadySent,
      },
      alerts: {
        success: row.alertSuccess,
        error: row.alertError,
      },
    },
  };
}

export async function writeContact(data: {
  contactPage: { intro: string };
  contactForm: {
    fields: { name: string; label: string; type: string; placeholder: string; required: boolean }[];
    submitButton: { default: string; sending: string; success: string; alreadySent: string };
    alerts: { success: string; error: string };
  };
}) {
  await prisma.contactConfig.upsert({
    where: { id: 1 },
    update: {
      pageIntro: data.contactPage.intro,
      formFields: data.contactForm.fields,
      submitDefault: data.contactForm.submitButton.default,
      submitSending: data.contactForm.submitButton.sending,
      submitSuccess: data.contactForm.submitButton.success,
      submitAlreadySent: data.contactForm.submitButton.alreadySent,
      alertSuccess: data.contactForm.alerts.success,
      alertError: data.contactForm.alerts.error,
    },
    create: {
      pageIntro: data.contactPage.intro,
      formFields: data.contactForm.fields,
      submitDefault: data.contactForm.submitButton.default,
      submitSending: data.contactForm.submitButton.sending,
      submitSuccess: data.contactForm.submitButton.success,
      submitAlreadySent: data.contactForm.submitButton.alreadySent,
      alertSuccess: data.contactForm.alerts.success,
      alertError: data.contactForm.alerts.error,
    },
  });
}

// ── Metadata ──

export async function readMetadata() {
  const row = await prisma.siteMetadata.findFirst();
  if (!row) throw new Error("Metadata not found");
  return {
    siteName: row.siteName,
    defaultTitle: row.defaultTitle,
    defaultDescription: row.defaultDescription,
    pages: row.pages,
  };
}

export async function writeMetadata(data: {
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  pages: Record<string, { title: string; description: string }>;
}) {
  await prisma.siteMetadata.upsert({
    where: { id: 1 },
    update: {
      siteName: data.siteName,
      defaultTitle: data.defaultTitle,
      defaultDescription: data.defaultDescription,
      pages: data.pages,
    },
    create: {
      siteName: data.siteName,
      defaultTitle: data.defaultTitle,
      defaultDescription: data.defaultDescription,
      pages: data.pages,
    },
  });
}
