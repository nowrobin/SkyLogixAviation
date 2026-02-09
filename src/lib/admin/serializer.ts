/* eslint-disable @typescript-eslint/no-explicit-any */

function indent(str: string, level: number): string {
  return "  ".repeat(level) + str;
}

function serializeValue(value: any, level: number): string {
  if (value === null || value === undefined) return "undefined";
  if (typeof value === "string") {
    // Use backtick for multiline strings
    if (value.includes("\n")) {
      return `\`${value.replace(/`/g, "\\`")}\``;
    }
    return JSON.stringify(value);
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    // Check if simple array of strings
    if (value.every((v) => typeof v === "string")) {
      if (value.join("").length < 80) {
        return `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
      }
      const items = value.map((v) => indent(JSON.stringify(v) + ",", level + 1));
      return `[\n${items.join("\n")}\n${indent("", level)}]`;
    }
    // Array of objects
    const items = value.map(
      (v) => indent(serializeValue(v, level + 1) + ",", level + 1)
    );
    return `[\n${items.join("\n")}\n${indent("", level)}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value);
    if (entries.length === 0) return "{}";
    const lines = entries.map(([key, val]) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      return indent(`${safeKey}: ${serializeValue(val, level + 1)},`, level + 1);
    });
    return `{\n${lines.join("\n")}\n${indent("", level)}}`;
  }
  return String(value);
}

// ── Company ──

export function serializeCompany(data: any): string {
  return `export const company = ${serializeValue(data, 0)};\n`;
}

// ── Home ──

export function serializeHome(data: { hero: any; welcome: any; sections: any }): string {
  const lines: string[] = [];
  lines.push(`export const hero = ${serializeValue(data.hero, 0)};`);
  lines.push("");
  lines.push(`export const welcome = ${serializeValue(data.welcome, 0)};`);
  lines.push("");

  // sections.crew.tabs needs `as const`
  const sectionsClone = JSON.parse(JSON.stringify(data.sections));
  const crewTabs = sectionsClone?.crew?.tabs;
  let sectionsStr = serializeValue(sectionsClone, 0);

  if (crewTabs) {
    const tabsStr = `[${crewTabs.map((t: string) => JSON.stringify(t)).join(", ")}]`;
    sectionsStr = sectionsStr.replace(
      `tabs: ${tabsStr}`,
      `tabs: ${tabsStr} as const`
    );
  }

  lines.push(`export const sections = ${sectionsStr};`);
  lines.push("");
  return lines.join("\n");
}

// ── Fleet ──

export function serializeFleet(data: any[]): string {
  const lines: string[] = [];
  lines.push(`export interface Aircraft {`);
  lines.push(`  id: string;`);
  lines.push(`  name: string;`);
  lines.push(`  year: number;`);
  lines.push(`  model: string;`);
  lines.push(`  engine: string;`);
  lines.push(`  horsepower: number;`);
  lines.push(`  flightRule: string;`);
  lines.push(`  pricePerHour: string;`);
  lines.push(`  description: string;`);
  lines.push(`  images: string[];`);
  lines.push(`}`);
  lines.push("");
  lines.push(`export const fleet: Aircraft[] = ${serializeValue(data, 0)};`);
  lines.push("");
  return lines.join("\n");
}

// ── Crew ──

export function serializeCrew(data: { categories: any[]; members: any }): string {
  const lines: string[] = [];

  lines.push(`export interface CrewMember {`);
  lines.push(`  id: string;`);
  lines.push(`  name: string;`);
  lines.push(`  role: string;`);
  lines.push(`  image: string;`);
  lines.push(`  bio?: string;`);
  lines.push(`  certifications?: string[];`);
  lines.push(`}`);
  lines.push("");

  const categoryKeys = data.categories.map((c: any) => `"${c.key}"`).join(" | ");
  lines.push(`export type CrewCategory = ${categoryKeys};`);
  lines.push("");

  lines.push(
    `export const crewCategories: { key: CrewCategory; label: string }[] = ${serializeValue(
      data.categories,
      0
    )};`
  );
  lines.push("");

  lines.push(
    `export const crew: Record<CrewCategory, CrewMember[]> = ${serializeValue(
      data.members,
      0
    )};`
  );
  lines.push("");
  return lines.join("\n");
}

// ── Training ──

export function serializeTraining(data: {
  intro: string;
  cta: any;
  steps: any[];
}): string {
  const lines: string[] = [];

  lines.push(`export interface TrainingStep {`);
  lines.push(`  id: string;`);
  lines.push(`  order: number;`);
  lines.push(`  title: string;`);
  lines.push(`  abbreviation: string;`);
  lines.push(`  icon: string;`);
  lines.push(`  description: string;`);
  lines.push(`  accentColor: string;`);
  lines.push(`  accentBg: string;`);
  lines.push(`  accentText: string;`);
  lines.push(`  requirements: string[];`);
  lines.push(`  learns: string[];`);
  lines.push(`  learnsLabel: string;`);
  lines.push(`}`);
  lines.push("");

  lines.push(`export const trainingIntro =`);
  lines.push(`  ${JSON.stringify(data.intro)};`);
  lines.push("");

  lines.push(`export const trainingCta = ${serializeValue(data.cta, 0)};`);
  lines.push("");

  lines.push(
    `export const trainingSteps: TrainingStep[] = ${serializeValue(data.steps, 0)};`
  );
  lines.push("");
  return lines.join("\n");
}

// ── Contact ──

export function serializeContact(data: { contactPage: any; contactForm: any }): string {
  const lines: string[] = [];
  lines.push(`export const contactPage = ${serializeValue(data.contactPage, 0)};`);
  lines.push("");
  lines.push(`export const contactForm = ${serializeValue(data.contactForm, 0)};`);
  lines.push("");
  return lines.join("\n");
}

// ── Navigation ──

export function serializeNavigation(data: { navItems: any[]; navCta: any }): string {
  const lines: string[] = [];
  lines.push(`export interface NavItem {`);
  lines.push(`  label: string;`);
  lines.push(`  href: string;`);
  lines.push(`  scrollTo?: string;`);
  lines.push(`}`);
  lines.push("");
  lines.push(`export const navItems: NavItem[] = ${serializeValue(data.navItems, 0)};`);
  lines.push("");
  lines.push(`export const navCta = ${serializeValue(data.navCta, 0)};`);
  lines.push("");
  return lines.join("\n");
}

// ── Metadata ──

export function serializeMetadata(data: any): string {
  return `export const siteMetadata = ${serializeValue(data, 0)};\n`;
}
