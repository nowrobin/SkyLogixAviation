"use client";

import Link from "next/link";

const sections = [
  {
    title: "Home Page",
    description: "Hero banner, welcome section, and section titles",
    href: "/admin/home",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </svg>
    ),
    accent: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "Fleet",
    description: "Aircraft listings, specs, and images",
    href: "/admin/fleet",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    accent: "bg-indigo-500",
    bg: "bg-indigo-50",
    text: "text-indigo-600",
  },
  {
    title: "Crew",
    description: "Founders, instructors, and mechanics",
    href: "/admin/crew",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    accent: "bg-violet-500",
    bg: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    title: "Training",
    description: "Training programs and requirements",
    href: "/admin/training",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    accent: "bg-amber-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
  },
  {
    title: "Company",
    description: "Address, phone, email, hours, rates",
    href: "/admin/company",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    accent: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    title: "Contact",
    description: "Contact page content and form settings",
    href: "/admin/contact",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    accent: "bg-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-600",
  },
  {
    title: "Navigation",
    description: "Header navigation items and CTA button",
    href: "/admin/navigation",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    accent: "bg-cyan-500",
    bg: "bg-cyan-50",
    text: "text-cyan-600",
  },
  {
    title: "SEO Metadata",
    description: "Titles and descriptions per page",
    href: "/admin/metadata",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    accent: "bg-slate-500",
    bg: "bg-slate-50",
    text: "text-slate-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-2xl bg-[#0A1628] px-8 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#FFBD59]/70 mb-1">
          Skylogix Aviation
        </p>
        <h2 className="text-xl font-semibold text-white">
          Admin Dashboard
        </h2>
        <p className="mt-1 text-sm text-white/50">
          Select a section below to manage your website content.
        </p>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100"
          >
            <div className={`mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg ${section.bg} ${section.text}`}>
              {section.icon}
            </div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {section.title}
                </h3>
                <p className="mt-0.5 text-xs text-gray-400 leading-relaxed">
                  {section.description}
                </p>
              </div>
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className={`absolute bottom-0 left-0 h-0.5 w-0 ${section.accent} transition-all duration-300 group-hover:w-full`} />
          </Link>
        ))}
      </div>
    </div>
  );
}
